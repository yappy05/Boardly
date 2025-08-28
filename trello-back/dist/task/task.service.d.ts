import { PrismaService } from '../prisma/prisma.service';
import { TaskDto } from '../kanban/dto/add-task.dto';
import { KanbanService } from '../kanban/kanban.service';
import { $Enums } from 'prisma/__generated__';
import TaskStatus = $Enums.TaskStatus;
export declare class TaskService {
    private readonly prismaService;
    private readonly kanbanService;
    constructor(prismaService: PrismaService, kanbanService: KanbanService);
    addTask(kanbanId: string, dto: TaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        status: $Enums.TaskStatus;
        kanbanId: string;
    }>;
    moveTasks(kanbanId: string, activeTaskId: string, overTaskId: string): Promise<void>;
    moveTasksDiffColumns(kanbanId: string, activeTaskId: string, overStatus: TaskStatus, newOrder: number): Promise<void>;
}
