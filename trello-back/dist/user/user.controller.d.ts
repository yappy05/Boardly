import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findUserByEmail(email: string): Promise<({
        kanban: ({
            tasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                status: import("prisma/__generated__").$Enums.TaskStatus;
                kanbanId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            userId: string;
        })[];
    } & {
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
    }) | null>;
    findByRefreshToken(req: Request): Promise<{
        name: string;
        email: string;
        id: string;
        refreshToken: string | null;
    } | null>;
}
