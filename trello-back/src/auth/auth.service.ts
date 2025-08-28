import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RequestCookieDto } from './dto/request-cookie.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async googleAuth(profile: any) {
    const { name, emails } = profile;
    let user = await this.userService.findByProviderId(profile.id, 'GOOGLE');
    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          name: name.givenName,
          email: emails[0].value,
          provider: 'GOOGLE',
          providerId: profile.id,
        },
      });
    }
    const tokens = await this.generateTokens(user.name, user.id);
    return { user, tokens };
  }

  public async yandexAuth(profile) {
    // Если приходит { profile: {...} }, извлекаем профиль
    // Ваш существующий код
    const { login, emails, first_name } = profile;
    console.log(profile)
    let user = await this.userService.findByProviderId(profile.id, 'YANDEX');
    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          name: login || first_name || emails[0].value.split('@')[0], // гарантия имени
          email: emails[0].value,
          provider: 'YANDEX',
          providerId: profile.id,
        },
      });
    }
    const tokens = await this.generateTokens(user.name, user.id);
    return { user, tokens };
  }

  public async register(res: Response, dto: RegisterDto) {
    const user = await this.userService.create(dto);
    const tokens = await this.generateTokens(user.name, user.id);
    await this.updateRefreshToken(res, user.id, tokens.refreshToken);
    return tokens;
  }

  public async login(res: Response, dto: LoginDto) {
    const { email, password } = dto;
    const user = await this.userService.findByEmail(email);
    if (!user)
      throw new NotFoundException('Пользователь с такой почтой не найден');
    if (user.password !== password)
      throw new NotFoundException('Пользователь с таким паролем не найден');
    const tokens = await this.generateTokens(user.name, user.id);
    console.log(tokens);
    await this.updateRefreshToken(res, user.id, tokens.refreshToken);
    return tokens;
  }

  public async logout(res: Response, req: Request) {
    const cookie = req.cookies as RequestCookieDto;
    const refreshToken = cookie['refreshToken'];
    res.clearCookie('refreshToken');
    const user = await this.prismaService.user.findFirst({
      where: { refreshToken },
    });
    if (!user) throw new NotFoundException();
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });
  }

  private async generateTokens(name: string, id: string) {
    const payload = { username: name, sub: id };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRES'),
    });
    return { accessToken, refreshToken };
  }

  //применяется когда access истек, но refresh еще нет
  public async updateTokens(res: Response, req: Request) {
    const user = await this.userService.findByRefreshToken(req, true);
    if (!user) throw new NotFoundException('полбзователь не найден');
    const cookies = req.cookies as RequestCookieDto;
    const refreshToken = cookies['refreshToken'];
    console.log(refreshToken);

    if (!user.refreshToken)
      throw new UnauthorizedException('Refresh token not found in cookies');
    if (user.refreshToken !== refreshToken) {
      console.log(user.refreshToken);
      console.log(refreshToken);
      throw new UnauthorizedException('Refresh token mismatch');
    }

    try {
      await this.jwtService.verifyAsync<{ sub: string }>(refreshToken);
      const tokens = await this.generateTokens(user.name, user.id);
      await this.updateRefreshToken(res, user.id, tokens.refreshToken);
      return tokens;
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (e.name === 'TokenExpiredError')
        throw new UnauthorizedException('Refresh token expired');
      console.log(e);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async updateRefreshToken(
    res: Response,
    userId: string,
    refreshToken: string,
  ) {
    this.setRefreshTokenCookie(res, refreshToken);
    return this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie('refreshToken', refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
    });
    console.log(res.getHeader('Set-Cookie'));
  }
}
