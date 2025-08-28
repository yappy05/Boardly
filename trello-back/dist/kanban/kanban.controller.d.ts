import { KanbanService } from './kanban.service';
import { CreateDto } from './dto/create.dto';
import { TaskDto } from './dto/add-task.dto';
import { Request } from 'express';
import { TaskService } from '../task/task.service';
export declare class KanbanController {
    private readonly kanbanService;
    private readonly taskService;
    constructor(kanbanService: KanbanService, taskService: TaskService);
    create(dto: CreateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        userId: string;
    }>;
    addTask(kanbanId: string, dto: TaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number;
        status: import("prisma/__generated__").$Enums.TaskStatus;
        kanbanId: string;
    }>;
    findById(id: string): Promise<({
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
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
    findAll(req: Request): Promise<({
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            order: number;
            status: import("prisma/__generated__").$Enums.TaskStatus;
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
