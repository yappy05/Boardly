import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthResult } from './types/GoogleAuthResult';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  //todo убрать бизнес логику
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Res({ passthrough: true }) res: Response,
    @Req() req: { user: GoogleAuthResult },
  ) {
    const { user, tokens } = req.user;
    res.cookie('refreshToken', tokens.refreshToken);
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: tokens.refreshToken,
      },
    });
    res.redirect(`http://localhost:5173/home?token=${tokens.accessToken}`);
    return { tokens };
  }

  @Post('register')
  public register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterDto,
  ) {
    return this.authService.register(res, dto);
  }

  @Post('refresh')
  public refreshTokens(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.updateTokens(res, req);
  }

  @Post('login')
  public login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginDto,
  ) {
    return this.authService.login(res, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  public logout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    return this.authService.logout(res, req);
  }
}
