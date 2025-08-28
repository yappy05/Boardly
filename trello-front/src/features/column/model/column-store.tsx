import type {Column, ColumnStatus} from "../../../entities/Column/model/types.ts";
import {create} from "zustand/react";
import type {TaskResponse} from "../../../entities/task/model/types.ts";
import type {KanbanWithTasks} from "../../../entities/kanban/model/types.ts";


interface IColumnStore {
    columns: Column[]

    getColumn: (columnStatus: ColumnStatus) => Column | null
    addTask: (columnStatus: ColumnStatus, task: TaskResponse) => void
    removeTask: (columnStatus: ColumnStatus, taskId: string) => void
    setTasks: (columnStatus: ColumnStatus, tasks: TaskResponse[]) => void
    moveTask: (taskId: string, fromStatus: ColumnStatus, toStatus: ColumnStatus) => void

    initializeKanban: (kanban: KanbanWithTasks) => void
}

export const useColumnStore = create<IColumnStore>((set, get) => ({
    columns: [
        {status: "INBOX", tasks: []},
        {status: "TODO", tasks: []},
        {status: "INPROGRESS", tasks: []},
        {status: "DONE", tasks: []},
    ],
    getColumn: (columnStatus: ColumnStatus) => {
        const {columns} = get()
        const column = columns.find(column => column.status === columnStatus)
        return column ?? null
    },
    addTask: (columnStatus: ColumnStatus, task: TaskResponse) => {
        set(state => ({
            columns: state.columns.map(column =>
                column.status === columnStatus
                    ? { ...column, tasks: [task, ...column.tasks] } // в конец
                    : column
            )
        }));
    },
    removeTask: (columnStatus: ColumnStatus, taskId: string) => {
        set(state => ({
            columns: state.columns.map(column =>
                column.status === columnStatus?
                    {...column, tasks: column.tasks.filter(task => task.id !== taskId)}
                    : column
            )
        }))
    },
    moveTask: (taskId: string, fromStatus: ColumnStatus, toStatus: ColumnStatus) => {
        set(state => {
            const task = state.columns
                .find(column => column.status === fromStatus)
                ?.tasks.find(task => task.id === taskId)

            if (!task) return state

            const updatedTask = {...task, status: toStatus}

            return {
                columns: state.columns.map(column => {
                    if (column.status === fromStatus) {
                        return { ...column, tasks: column.tasks.filter(t => t.id !== taskId) }
                    }
                    if (column.status === toStatus) {
                        return { ...column, tasks: [...column.tasks, updatedTask] }
                    }
                    return column
                })
            }
        })

    },
    setTasks: (columnStatus: ColumnStatus, tasks: TaskResponse[]) => {
        set(state => ({
            columns: state.columns.map(column =>
                column.status === columnStatus
                    ? { ...column, tasks } // в конец
                    : column
            )
        }))
    },
    initializeKanban: (kanban: KanbanWithTasks) => {
        set(state => {
            const clearedColumns: Column[] = state.columns.map(col => ({
                ...col,
                tasks: []
            }))
            kanban.tasks.forEach(task => {
                const column = clearedColumns.find(col => col.status === task.status);
                if (column) {
                    column.tasks.push(task);
                }
            });
            console.log('ok')

            return { columns: clearedColumns };
        })
    }
}))