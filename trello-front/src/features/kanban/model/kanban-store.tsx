import type {CreateKanbanDto, Kanban, KanbanWithTasks} from "../../../entities/kanban/model/types.ts";
import {create} from "zustand/react";
import {KanbanApi} from "../../../entities/kanban/api/kanban-api.ts";

interface IKanbanStore {
    kanbans: Kanban[]
    currentKanban: KanbanWithTasks | null
    isLoading: boolean
    error: string | null

    setKanbans: (kanbans: Kanban[]) => void;
    addKanban: (kanban: Kanban) => void
    setCurrentKanban: (kanban: KanbanWithTasks) => void;
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void

    fetchKanbans: () => Promise<void>
    fetchCurrentKanban: (kanbanId: string) => Promise<void>
    createKanban: (dto: CreateKanbanDto) => Promise<Kanban>
}

export const useKanbanStore = create<IKanbanStore>((set) => ({
    kanbans: [],
    currentKanban: null,
    error: null,
    isLoading: false,

    setKanbans: (kanbans) => set({kanbans}),
    addKanban: (kanban) => set(state => ({kanbans: [...state.kanbans, kanban]})),
    setCurrentKanban: (currentKanban) => set({currentKanban}),
    setLoading: (isLoading) => set({isLoading}),
    setError: (error) => set({error}),

    fetchKanbans: async () => {
        set({isLoading: true, error: null})
        try {
            const kanbans = await KanbanApi.getKanbans()
            set({kanbans, isLoading: false})
        } catch (error) {
            set({error: `Failed to fetch kanbans:`, isLoading: false});
            throw error
        }
    },
    createKanban: async (dto: CreateKanbanDto) => {
        set({isLoading: true, error: null})
        try {
            const newKanban = await KanbanApi.createKanban(dto)
            set(state => ({kanbans: [...state.kanbans, newKanban], isLoading: false}))
            return newKanban
        } catch (error) {
            set({error: 'Failed to delete kanban', isLoading: false});
            throw error;
        }
    },

    fetchCurrentKanban: async (kanbanId: string) => {
        set({isLoading: true, error: null})
        try {
            const kanban = await KanbanApi.getKanban(kanbanId)
            set({currentKanban: kanban, isLoading: false})
        } catch (error) {
            set({error: 'Failed to delete kanban', isLoading: false});
            throw error;
        }
    }
}))