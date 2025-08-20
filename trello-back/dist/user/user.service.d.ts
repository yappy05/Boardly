import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { Request } from 'express';
import { Provider } from 'prisma/__generated__';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(dto: RegisterDto): Promise<{
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
    }>;
    findByEmail(email: string): Promise<({
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
    findByRefreshToken(req: Request, includeRefreshToken?: boolean): Promise<{
        name: string;
        email: string;
        id: string;
        refreshToken: string | null;
    } | null>;
    findByProviderId(providerId: string, provider: Provider): Promise<{
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
    } | null>;
}
