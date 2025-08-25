import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { KanbanService } from '../kanban/kanban.service';
import { KanbanModule } from '../kanban/kanban.module';
import { UserService } from '../user/user.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, KanbanService, UserService],
  exports: [TaskService],
})
export class TaskModule {}
