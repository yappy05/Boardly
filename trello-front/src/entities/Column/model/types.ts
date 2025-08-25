import type {Task} from "../../task/model/types.ts";

export type ColumnStatus = "INBOX" | "INPROGRESS" | "DONE" | "TODO"

export interface Column {
    status: ColumnStatus,
    tasks: Task[]
}