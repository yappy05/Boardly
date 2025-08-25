import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';
import { UserService } from '../user/user.service';
import { TaskService } from '../task/task.service';

@Module({
  imports: [],
  controllers: [KanbanController],
  providers: [KanbanService, UserService, TaskService],
  exports: [KanbanService],
})
export class KanbanModule {}
