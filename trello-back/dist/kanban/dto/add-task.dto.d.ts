import { TaskStatus } from 'prisma/__generated__';
export declare class TaskDto {
    title: string;
    status?: TaskStatus;
    kanbanId: string;
}
