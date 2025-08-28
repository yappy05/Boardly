import type {TaskResponse} from "../../task/model/types.ts";
import {Task} from "../../../features/task/ui/Task.tsx";
import type {ColumnStatus} from "../model/types.ts";

export interface ColumnProps {
    tasks: TaskResponse[]
    columnStatus: ColumnStatus
}

export const ColumnUi = ({tasks, columnStatus}: ColumnProps) => {
    return (
        <div className={'flex flex-col gap-1 mt-5'}>
            {tasks.map(task => (
               <div key={task.id}>
                   {<Task task={task}/>}
               </div>
            ))}
        </div>
    )
}