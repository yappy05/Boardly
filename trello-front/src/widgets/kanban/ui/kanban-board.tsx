import {Inbox} from "./inbox.tsx";
import {Board} from "./board.tsx";

export const KanbanBoard = () => {
    return (
        <div className={'flex flex-1'}>
            <Inbox/>
            <Board/>
        </div>
    )
}