import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskDto } from '../kanban/dto/add-task.dto';
import { KanbanService } from '../kanban/kanban.service';
import { $Enums, Task } from 'prisma/__generated__';
import { not } from 'rxjs/internal/util/not';
import TaskStatus = $Enums.TaskStatus;

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

  public async moveTasks(
    kanbanId: string,
    activeTaskId: string,
    overTaskId: string,
  ) {
    const kanban = await this.kanbanService.findById(kanbanId);
    if (!kanban) throw new NotFoundException('доска не найдена');
    const activeTask = kanban.tasks.find((task) => task.id === activeTaskId);
    const overTask = kanban.tasks.find((task) => task.id === overTaskId);
    if (!activeTask || !overTask)
      throw new NotFoundException('задача не найдена');
    await this.prismaService.$transaction([
      this.prismaService.task.update({
        where: { id: activeTask.id },
        data: {
          order: overTask.order,
        },
      }),
      this.prismaService.task.update({
        where: { id: overTask.id },
        data: {
          order: activeTask.order,
        },
      }),
    ]);
  }

  public async moveTasksDiffColumns(
    kanbanId: string,
    activeTaskId: string,
    overStatus: TaskStatus,
    newOrder: number,
  ) {
    const kanban = await this.kanbanService.findById(kanbanId);
    if (!kanban) throw new NotFoundException('доска не найдена');
    const activeTask = kanban.tasks.find((task) => task.id === activeTaskId);
    if (!activeTask) throw new NotFoundException('задача не найдена');
    const task = await this.prismaService.task.update({
      where: { id: activeTask.id },
      data: { order: newOrder, status: overStatus },
    });
    console.log(task);
  }
}
