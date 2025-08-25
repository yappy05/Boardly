import type {ColumnStatus} from "../../../entities/Column/model/types.ts";
import {useKanban} from "../../kanban/model/use-kanban.tsx";
import {useEffect} from "react";
import {useColumnStore} from "./column-store.tsx";

export const useColumn = (status: ColumnStatus) => {
    const { addColumn, setTasks, getTasks, addTask } = useColumnStore()
    const { currentKanban } = useKanban()

    useEffect(() => {
        addColumn(status)
    }, [addColumn, status])

    useEffect(() => {
        if (!currentKanban) return
        const filteredTasks = currentKanban.tasks.filter(task => task.status === status)
        setTasks(status, filteredTasks)
    }, [currentKanban, status, setTasks])


    return { columnStatus: status, addTask, tasks: getTasks(status) }
}