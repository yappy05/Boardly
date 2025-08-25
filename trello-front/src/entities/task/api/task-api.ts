import type {CreateTaskDto, TaskResponse} from "../model/types.ts";
import {http} from "../../../shared/api/http.ts";

export const TaskApi = {
    createTask: async (kanbanId: string ,dto: CreateTaskDto): Promise<TaskResponse> => {
        const response = await http.post(`kanban/${kanbanId}/add-task`, dto)
        return response.data
    }
}