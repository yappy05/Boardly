import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request } from 'express';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(dto: RegisterDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("prisma/__generated__").$Enums.UserRole;
        accessToken: string | null;
        refreshToken: string | null;
        expiresAt: number | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: import("prisma/__generated__").$Enums.UserRole;
        accessToken: string | null;
        refreshToken: string | null;
        expiresAt: number | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByRefreshToken(req: Request, includeRefreshToken?: boolean): Promise<{
        id: string;
        name: string;
        email: string;
        refreshToken: string | null;
    } | null>;
}
