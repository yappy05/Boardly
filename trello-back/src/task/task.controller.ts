import { Body, Controller, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from '../kanban/dto/add-task.dto';
import { $Enums, Task } from 'prisma/__generated__';
import TaskStatus = $Enums.TaskStatus;

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':kanbanId/add-task')
  public create(@Param('kanbanId') kanbanId: string, @Body() dto: TaskDto) {
    return this.taskService.addTask(kanbanId, dto);
  }

  @Post(':kanbanId/move-tasks')
  public move(
    @Param('kanbanId') kanbanId: string,
    @Body('activeTaskId') activeTaskId: string,
    @Body('overTaskId') overTaskId: string,
  ) {
    return this.taskService.moveTasks(kanbanId, activeTaskId, overTaskId);
  }

  @Post(':kanbanId/move-tasks-diff-cols')
  public moveTasksDiffCols(
    @Param('kanbanId') kanbanId: string,
    @Body('activeTaskId') activeTaskId: string,
    @Body('overStatus') overStatus: TaskStatus,
    @Body('newOrder') newOrder: number,
  ) {
    return this.taskService.moveTasksDiffColumns(
      kanbanId,
      activeTaskId,
      overStatus,
      newOrder,
    );
  }
}
