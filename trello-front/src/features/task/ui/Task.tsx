import type {TaskResponse} from "../../../entities/task/model/types.ts";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";


interface TaskProps {
    task: TaskResponse
}

export const Task = ({task}: TaskProps) => {
    const {transform, transition, attributes, listeners, setNodeRef} = useSortable({
        id: task.id,
        data: {
            task,
            type: 'task',
            columnStatus: task.status
        },
        animateLayoutChanges: () => true
    })
    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className={'flex p-1 bg-red-200'}>
            {task.title}
        </div>
    )
}