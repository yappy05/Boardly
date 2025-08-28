import {ColumnContainer} from "../../../features/column/ui/ColumnContainer.tsx";




export const Inbox = () => {
    return (
        <div className={'flex'}>
            <ColumnContainer columnStatus={'INBOX'}/>
        </div>
    )
}