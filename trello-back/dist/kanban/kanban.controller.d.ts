import { KanbanService } from './kanban.service';
import { CreateDto } from './dto/create.dto';
import { TaskDto } from './dto/add-task.dto';
export declare class KanbanController {
    private readonly kanbanService;
    constructor(kanbanService: KanbanService);
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
