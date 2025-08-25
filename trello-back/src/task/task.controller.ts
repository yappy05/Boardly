import { Body, Controller, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from '../kanban/dto/add-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':kanbanId/add-task')
  public create(@Param('kanbanId') kanbanId: string, @Body() dto: TaskDto) {
    return this.taskService.addTask(kanbanId, dto);
  }
}
