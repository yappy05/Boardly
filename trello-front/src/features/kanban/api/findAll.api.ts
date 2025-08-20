import {http} from "../../../shared/api/http.ts";
import type {KanbanResponseType} from "./types/kanban-response.type.ts";

export const findAllApi = async (userId: string): Promise<KanbanResponseType[]> => {
    try {
        const response = await http.post<KanbanResponseType[]>('/kanban/find-all', { userId });
        return response.data;
    } catch (error) {
        console.error('Не удалось найти доски:', error);
        throw error; // Просто пробрасываем ошибку дальше
    }
};