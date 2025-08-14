import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUserByEmail(email: string): Promise<{
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
    findByRefreshToken(req: Request): Promise<{
        id: string;
        name: string;
        email: string;
        refreshToken: string | null;
    } | null>;
}
