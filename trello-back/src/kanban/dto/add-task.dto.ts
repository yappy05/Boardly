import { TaskStatus } from 'prisma/__generated__';

export class TaskDto {
  title: string;
  status?: TaskStatus;
  kanbanId: string;
}
