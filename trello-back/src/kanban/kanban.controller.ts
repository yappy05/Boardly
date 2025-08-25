import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { CreateDto } from './dto/create.dto';
import { TaskDto } from './dto/add-task.dto';
import { Request } from 'express';
import { TaskService } from '../task/task.service';

@Controller('kanban')
export class KanbanController {
  constructor(
    private readonly kanbanService: KanbanService,
    private readonly taskService: TaskService,
  ) {}

  @Post('create')
  public create(@Body() dto: CreateDto) {
    return this.kanbanService.create(dto);
  }

  @Post(':kanbanId/add-task')
  public addTask(@Param('kanbanId') kanbanId: string, @Body() dto: TaskDto) {
    return this.taskService.addTask(kanbanId, dto);
  }

  @Get('by-id/:id')
  public findById(@Param('id') id: string) {
    return this.kanbanService.findById(id);
  }

  @Get('find-all')
  public findAll(@Req() req: Request) {
    return this.kanbanService.findAll(req);
  }
}
