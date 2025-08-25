import { TaskService } from './task.service';
import { TaskDto } from '../kanban/dto/add-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(kanbanId: string, dto: TaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        status: import("prisma/__generated__").$Enums.TaskStatus;
        order: number;
        kanbanId: string;
    }>;
}
