import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request } from 'express';
import { RequestCookieDto } from '../auth/dto/request-cookie.dto';
import { Provider } from 'prisma/__generated__';


@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: RegisterDto) {
    console.log('+');
    const { name, email, password } = dto;
    const isExistUser = await this.findByEmail(email);
    if (isExistUser)
      throw new ConflictException('Пользователь с таким email уже существует');
    const user = this.prismaService.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  public async findByRefreshToken(req: Request, includeRefreshToken = false) {
    const cookie = req.cookies as RequestCookieDto;
    const refreshToken = cookie['refreshToken'];
    const user = await this.prismaService.user.findFirst({
      where: {
        refreshToken,
      },
      select: {
        id: true,
        name: true,
        email: true,
        refreshToken: includeRefreshToken,
      },
    });
    return user;
  }

  public async findByProviderId(providerId: string, provider: Provider) {
    const user = await this.prismaService.user.findFirst({
      where: {
        providerId,
        provider,
      },
    });
    return user;
  }
}
