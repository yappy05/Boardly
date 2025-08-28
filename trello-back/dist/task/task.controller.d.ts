import { TaskService } from './task.service';
import { TaskDto } from '../kanban/dto/add-task.dto';
import { $Enums } from 'prisma/__generated__';
import TaskStatus = $Enums.TaskStatus;
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(kanbanId: string, dto: TaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        status: $Enums.TaskStatus;
        kanbanId: string;
    }>;
    move(kanbanId: string, activeTaskId: string, overTaskId: string): Promise<void>;
    moveTasksDiffCols(kanbanId: string, activeTaskId: string, overStatus: TaskStatus, newOrder: number): Promise<void>;
}
