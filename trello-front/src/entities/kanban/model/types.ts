import type {BaseEntity} from "../../../shared/types";
import type {Task} from "../../task/model/types.ts";

export interface Kanban extends BaseEntity {
    title: string
    userId: string
}

export interface KanbanWithTasks extends Kanban {
    tasks: Task[]
}

export type CreateKanbanDto = Omit<Kanban, 'id' | 'createdAt' | 'updatedAt'>

export type KanbanResponse = Kanban
export type KanbanWithTasksResponse = KanbanWithTasks
export type KanbansResponse = Kanban[]