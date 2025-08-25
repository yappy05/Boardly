import type {Column, ColumnStatus} from "../../../entities/Column/model/types.ts";
import {create} from "zustand/react";
import type {CreateTaskDto, Task} from "../../../entities/task/model/types.ts";
import {TaskApi} from "../../../entities/task/api/task-api.ts";


interface IColumnStore {
    columns: Column[]

    getColumnByStatus: (columnStatus: ColumnStatus) => Column | null

    addColumn: (columnStatus: ColumnStatus) => void
    getTasks: (columnStatus: ColumnStatus) => Task[]
    setTasks: (columnStatus: ColumnStatus, tasks: Task[]) => void

    addTask: (kanbanId: string, task: CreateTaskDto) => Promise<Task>
}

export const useColumnStore = create<IColumnStore>((set, get) => ({
    // const {currentKanban} = useKanban(),

    columns: [],

    getColumnByStatus: (columnStatus: ColumnStatus) => {
        return get().columns.find(col => col.status === columnStatus) ?? null
    },
    addColumn: (columnStatus: ColumnStatus) => set(state => ({
        columns: [...state.columns, {
            status: columnStatus,
            tasks: []
        }]
    })),
    addTask: async (kanbanId: string, task: CreateTaskDto) => {
        const currentTask = await TaskApi.createTask(kanbanId, task);
        const status = task.status
        set(state => ({
            columns: state.columns.map(col =>
                col.status === status ?
                    { ...col, tasks: [...col.tasks, currentTask] } : col
            )
        }));
        return currentTask;
    },
    getTasks: (columnStatus: ColumnStatus) => {
        const column = get().columns.find(col => col.status === columnStatus);
        return column ? column.tasks : [];
    },

    setTasks: (columnStatus: ColumnStatus, tasks: Task[]) => {
        set(state => ({
            columns: state.columns.map(col =>
                col.status === columnStatus ?
                    {...col, tasks: [...tasks]} : col
            )
        }))
    }

}))