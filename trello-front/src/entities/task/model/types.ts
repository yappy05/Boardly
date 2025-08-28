import type {BaseEntity} from "../../../shared/types";

export type TaskStatus = "INBOX" | "INPROGRESS" | "DONE" | "TODO"

export interface Task extends BaseEntity {
    status: TaskStatus;
    title: string;
    kanbanId: string;
    order: number;
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>
export type UpdatedTaskDto = Partial<CreateTaskDto>

export type TaskResponse = Task;
export type TasksResponse = Task[]