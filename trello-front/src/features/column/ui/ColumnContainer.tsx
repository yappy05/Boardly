import {Column} from "../../../entities/Column/ui/Column.tsx";
import type {ColumnStatus} from "../../../entities/Column/model/types.ts";
import {useColumn} from "../model/use-column.tsx";

interface ColumnProps {
    columnStatus: ColumnStatus;
}

export const ColumnContainer = ({columnStatus}: ColumnProps) => {
    const {tasks} = useColumn(columnStatus)
    return (
        <>
            <Column tasks={tasks}/>
        </>
    )
}
