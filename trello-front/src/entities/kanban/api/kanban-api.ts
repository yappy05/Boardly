import {http} from "../../../shared/api/http.ts";
import type {CreateKanbanDto, KanbanResponse, KanbansResponse, KanbanWithTasksResponse} from "../model/types.ts";

export const KanbanApi = {
    createKanban: async (dto: CreateKanbanDto): Promise<KanbanResponse> => {
        const response = await http.post('/kanban/create', dto)
        return response.data
    },
    getKanbans: async (): Promise<KanbanWithTasksResponse[]> => {

        const response = await http.get('/kanban/find-all')
        console.log(response.data)
        return response.data
    },
    getKanban: async (id: string): Promise<KanbanWithTasksResponse> => {
        const response = await http.get(`/kanban/by-id/${id}`)
        return response.data
    }
}