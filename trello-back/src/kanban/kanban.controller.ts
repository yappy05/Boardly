import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { CreateDto } from './dto/create.dto';
import { TaskDto } from './dto/add-task.dto';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Post('create')
  public create(@Body() dto: CreateDto) {
    return this.kanbanService.create(dto);
  }

  @Post(':id/add-task')
  public addTask(@Param('id') id: string, @Body() dto: TaskDto) {
    return this.kanbanService.addTask(id, dto);
  }

  @Get('by-id/:id')
  public findById(@Param('id') id: string) {
    return this.kanbanService.findById(id);
  }

  @Post('find-all')
  public findAll(@Body('userId') userId: string) {
    return this.kanbanService.findAll(userId);
  }
}
