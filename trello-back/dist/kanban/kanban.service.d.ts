import { PrismaService } from '../prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import { UserService } from '../user/user.service';
import { Request } from 'express';
export declare class KanbanService {
    private readonly prismaService;
    private readonly userService;
    constructor(prismaService: PrismaService, userService: UserService);
    create(dto: CreateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
    }>;
    findById(id: string): Promise<({
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            status: import("prisma/__generated__").$Enums.TaskStatus;
            order: number;
            kanbanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
    }) | null>;
    findAll(req: Request): Promise<({
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            status: import("prisma/__generated__").$Enums.TaskStatus;
            order: number;
            kanbanId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
    })[]>;
}
