"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
let KanbanService = class KanbanService {
    prismaService;
    userService;
    constructor(prismaService, userService) {
        this.prismaService = prismaService;
        this.userService = userService;
    }
    async create(dto) {
        const kanban = await this.prismaService.kanban.create({
            data: {
                title: dto.title,
                userId: dto.userId,
            },
        });
        return kanban;
    }
    async findById(id) {
        const kanban = await this.prismaService.kanban.findUnique({
            where: {
                id,
            },
            include: {
                tasks: {
                    orderBy: {
                        order: 'desc',
                    },
                },
            },
        });
        return kanban;
    }
    async findAll(req) {
        const user = await this.userService.findByRefreshToken(req);
        if (!user)
            throw new common_1.NotFoundException('пользователь не авторизирован');
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
            throw new common_1.NotFoundException('не удалось найти рабочие доски');
        return response.kanban;
    }
};
exports.KanbanService = KanbanService;
exports.KanbanService = KanbanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService])
], KanbanService);
//# sourceMappingURL=kanban.service.js.map