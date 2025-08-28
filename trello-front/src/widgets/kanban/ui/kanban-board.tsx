import {Inbox} from "./inbox.tsx";
import {Board} from "./board.tsx";
import {
    DndContext,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent, pointerWithin,
} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {Task} from "../../../features/task/ui/Task.tsx";
import type {TaskResponse} from "../../../entities/task/model/types.ts";
import {useColumnStore} from "../../../features/column/model/column-store.tsx";
import {http} from "../../../shared/api/http.ts";
import type {ColumnStatus} from "../../../entities/Column/model/types.ts";

export const KanbanBoard = () => {

    const {setTasks, getColumn, removeTask, addTask, moveTask, columns} = useColumnStore()
    const [activeTask, setActiveTask] = useState<TaskResponse | null>(null)
    const {id: kanbanId} = useParams()

    const handleDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;
        if (!over) return;

        console.log('Active data:', active.data.current);
        console.log('Over data:', over.data.current);

        const activeTask = active.data.current?.task;
        if (!activeTask) return;

        const activeStatus = activeTask.status;
        const activeTaskId = active.id.toString();

        let overStatus: ColumnStatus | undefined;

        if (over.data.current?.type === 'task') {
            overStatus = over.data.current.task?.status;
        } else if (over.data.current?.type === 'column') {
            overStatus = over.data.current.columnStatus;
        }

        if (!overStatus) return


        // Используйте правильные ID для поиска
        const activeIndex = getColumn(activeStatus)?.tasks.findIndex(task => task.id === activeTaskId);
        const overIndex = getColumn(overStatus)?.tasks.findIndex(task => task.id === over.id.toString());

        console.log('Active index:', activeIndex, 'Over index:', overIndex);

        if (activeStatus === overStatus) {
            // Перемещение внутри одной колонки
            if (activeIndex === undefined || overIndex === undefined) {
                console.log('Indexes undefined');
                return;
            }

            const tasks = getColumn(activeStatus)?.tasks;
            if (!tasks) {
                console.log('Tasks not found');
                return;
            }

            setTasks(activeStatus, arrayMove(tasks, activeIndex, overIndex));

            try {
                await http.post(`/task/${kanbanId}/move-tasks`, {
                    activeTaskId: activeTaskId,
                    overTaskId: over.id.toString()
                });
            } catch (error) {
                console.error('Failed to move tasks:', error);
            }
        } else {
            // Перемещение между колонками
            moveTask(activeTaskId, activeStatus, overStatus);
            try {
                const allTasks = columns.flatMap(col => col.tasks)
                const minOrder = Math.min(...allTasks.map(task => task.order))
                const newOrder = minOrder - 1
                console.log(newOrder)
                await http.post(`/task/${kanbanId}/move-tasks-diff-cols`, {activeTaskId, overStatus, newOrder})
            } catch (e) {
                console.log('не получилось поменять колонку задаче ', e)
            }
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const {active} = event;
        setActiveTask(active.data.current?.task)
    }

    return (
        <div className={'flex flex-1 gap-3 overflow-auto'}>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={pointerWithin}>
                <Inbox/>
                <Board/>
                <DragOverlay>
                    {activeTask? <Task task={activeTask}/>: null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}