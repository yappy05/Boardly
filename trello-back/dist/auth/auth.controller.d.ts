import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';
import { GoogleAuthResult } from './types/GoogleAuthResult';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthController {
    private readonly authService;
    private readonly prismaService;
    constructor(authService: AuthService, prismaService: PrismaService);
    googleAuth(): Promise<void>;
    googleAuthCallback(res: Response, req: {
        user: GoogleAuthResult;
    }): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
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
