import type {TaskResponse} from "../../../entities/task/model/types.ts";


interface TaskProps {
    task: TaskResponse
}

export const Task = ({task}: TaskProps) => {
    return (
        <div className={'flex p-1 bg-violet-300'}>
            {task.title}
        </div>
    )
}