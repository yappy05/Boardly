import { PrismaService } from '../prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import { TaskDto } from './dto/add-task.dto';
export declare class KanbanService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(dto: CreateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
    }>;
    addTask(id: string, dto: TaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        status: import("prisma/__generated__").$Enums.TaskStatus;
        kanbanId: string;
    }>;
    findById(id: string): Promise<({
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
    }) | null>;
    findAll(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
    }[]>;
}
