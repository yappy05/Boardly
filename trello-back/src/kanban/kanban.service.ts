import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import { TaskDto } from './dto/add-task.dto';

@Injectable()
export class KanbanService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(dto: CreateDto) {
    const kanban = await this.prismaService.kanban.create({
      data: {
        title: dto.title,
        userId: dto.userId,
      },
    });
    return kanban;
  }

  public async addTask(id: string, dto: TaskDto) {
    const task = this.prismaService.task.create({
      data: {
        title: dto.title,
        status: dto.status,
        kanbanId: id,
      },
    });
    return task;
  }

  public async findById(id: string) {
    const kanban = await this.prismaService.kanban.findUnique({
      where: {
        id,
      },
      include: {
        tasks: true,
      },
    });
    return kanban;
  }

  public async findAll(userId: string) {
    const response = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        kanban: true,
      },
    });
    if (!response)
      throw new NotFoundException('не удалось найти рабочие доски');
    return response.kanban;
  }
}
