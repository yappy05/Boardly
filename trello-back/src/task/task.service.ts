import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDto } from '../kanban/dto/add-task.dto';
import { KanbanService } from '../kanban/kanban.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly kanbanService: KanbanService,
  ) {}

  public async addTask(kanbanId: string, dto: TaskDto) {
    const kanban = await this.kanbanService.findById(kanbanId);
    if (!kanban) throw new NotFoundException('Доска не найдена');
    const length = kanban.tasks.length;
    const task = this.prismaService.task.create({
      data: {
        title: dto.title,
        status: dto.status,
        kanbanId,
        order: length + 1,
      },
    });
    return task;
  }
}
