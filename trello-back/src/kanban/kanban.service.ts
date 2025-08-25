import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDto } from './dto/create.dto';
import { TaskDto } from './dto/add-task.dto';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Injectable()
export class KanbanService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  public async create(dto: CreateDto) {
    const kanban = await this.prismaService.kanban.create({
      data: {
        title: dto.title,
        userId: dto.userId,
      },
    });
    return kanban;
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

  public async findAll(req: Request) {
    const user = await this.userService.findByRefreshToken(req);
    if (!user) throw new NotFoundException('пользователь не авторизирован');

    const response = await this.prismaService.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        kanban: {
          include: {
            tasks: true,
          },
        },
      },
    });
    if (!response)
      throw new NotFoundException('не удалось найти рабочие доски');
    return response.kanban;
  }
}
