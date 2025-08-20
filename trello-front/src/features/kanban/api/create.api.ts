import type {KanbanRequestType} from "./types/kanban-request.type.ts";
import {http} from "../../../shared/api/http.ts";

export const createApi = async (dto: KanbanRequestType) => {
    try {
        const response = await http.post('/kanban/create', dto)
        return response.data
    } catch (e) {
        console.log('не получилось создать новую доску ', e)
    }
}
