import { PrismaService } from '../prisma/prisma.service';
import { TaskDto } from '../kanban/dto/add-task.dto';
import { KanbanService } from '../kanban/kanban.service';
export declare class TaskService {
    private readonly prismaService;
    private readonly kanbanService;
    constructor(prismaService: PrismaService, kanbanService: KanbanService);
    addTask(kanbanId: string, dto: TaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        status: import("prisma/__generated__").$Enums.TaskStatus;
        order: number;
        kanbanId: string;
    }>;
}
