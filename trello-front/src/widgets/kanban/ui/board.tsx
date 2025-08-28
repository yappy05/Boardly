import {ColumnContainer} from "../../../features/column/ui/ColumnContainer.tsx";


export const Board = () => {
    return (
        <div className={'flex flex-1 flex-row gap-6  justify-center'}>
            <ColumnContainer columnStatus={'TODO'}/>
            <ColumnContainer columnStatus={"INPROGRESS"}/>
            <ColumnContainer columnStatus={"DONE"}/>
        </div>
    )
}