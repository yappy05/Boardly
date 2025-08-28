import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { GoogleAuthResult } from './types/GoogleAuthResult';
import { PrismaService } from '../prisma/prisma.service';
import { YandexAuthResult } from './types/YandexAuthResult';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private readonly prismaService;
    private readonly configService;
    constructor(authService: AuthService, prismaService: PrismaService, configService: ConfigService);
    googleAuth(): Promise<void>;
    googleAuthCallback(res: Response, req: {
        user: GoogleAuthResult;
    }): Promise<void>;
    yandexAuth(): Promise<void>;
    yandexAuthCallback(res: Response, req: {
        user: YandexAuthResult;
    }): Promise<void>;
    register(res: Response, dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(res: Response, req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(res: Response, dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(res: Response, req: Request): Promise<void>;
}
