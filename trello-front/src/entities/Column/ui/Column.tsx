import type {TaskResponse} from "../../task/model/types.ts";
import {Task} from "../../../features/task/ui/Task.tsx";

export interface ColumnProps {
    tasks: TaskResponse[]
}

export const Column = ({tasks}: ColumnProps) => {
    return (
        <div className={'flex flex-col gap-2 mt-5'}>
            {tasks.map(task => (
               <div key={task.id}>
                   {<Task task={task}/>}
               </div>
            ))}
        </div>
    )
}