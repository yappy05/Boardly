import {ColumnUi} from "../../../entities/Column/ui/Column.tsx";
import type {Column, ColumnStatus} from "../../../entities/Column/model/types.ts";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import type {TasksResponse} from "../../../entities/task/model/types.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useColumnStore} from "../model/column-store.tsx";
import {TaskApi} from "../../../entities/task/api/task-api.ts";

interface ColumnProps {
    columnStatus: ColumnStatus;
}

export const ColumnContainer = ({columnStatus}: ColumnProps) => {

    const {id: kanbanId} = useParams()

    const [currentColumn, setCurrentColumn] = useState<Column>()
    const [input, setInput] = useState('')

    const {getColumn, addTask} = useColumnStore()
    const columns = useColumnStore(state => state.columns)

    useEffect(() => {
        const column = getColumn(columnStatus)
        if (!column) return
        setCurrentColumn(column)
    }, [getColumn, columns]);

    const handleAddTask = async () => {
        if (!kanbanId) return
        const task = await TaskApi.createTask(kanbanId, {status: columnStatus, title: input, kanbanId})
        addTask(columnStatus, task)
    }

    const {setNodeRef} = useDroppable({
        id: columnStatus,
        data: {
            type: 'column',
            columnStatus
        }
    })

    if (!currentColumn) return

    return (
        <div ref={setNodeRef} className={'flex flex-col gap1 bg-white rounded-lg p-5 min-w-2/7'}>
                <SortableContext items={currentColumn.tasks} strategy={verticalListSortingStrategy}>
                    <h2 className={'text-center font-bold'}>{columnStatus}</h2>
                    <input type="text" placeholder={'task...'} className={'bg-white'} onChange={event => setInput(event.target.value)}/>
                    <button onClick={handleAddTask}>добавить</button>
                    <ColumnUi tasks={currentColumn.tasks} columnStatus={columnStatus}/>
                </SortableContext>
        </div>
    )

}
