import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly prismaService;
    private readonly userService;
    private readonly jwtService;
    private readonly configService;
    constructor(prismaService: PrismaService, userService: UserService, jwtService: JwtService, configService: ConfigService);
    googleAuth(profile: any): Promise<{
        user: {
            name: string;
            email: string;
            password: string | null;
            id: string;
            role: import("prisma/__generated__").$Enums.UserRole;
            provider: import("prisma/__generated__").$Enums.Provider | null;
            providerId: string | null;
            accessToken: string | null;
            refreshToken: string | null;
            expiresAt: number | null;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    register(res: Response, dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    login(res: Response, dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(res: Response, req: Request): Promise<void>;
    private generateTokens;
    updateTokens(res: Response, req: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private updateRefreshToken;
    private setRefreshTokenCookie;
}
