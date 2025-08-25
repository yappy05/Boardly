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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KanbanController = void 0;
const common_1 = require("@nestjs/common");
const kanban_service_1 = require("./kanban.service");
const create_dto_1 = require("./dto/create.dto");
const add_task_dto_1 = require("./dto/add-task.dto");
const task_service_1 = require("../task/task.service");
let KanbanController = class KanbanController {
    kanbanService;
    taskService;
    constructor(kanbanService, taskService) {
        this.kanbanService = kanbanService;
        this.taskService = taskService;
    }
    create(dto) {
        return this.kanbanService.create(dto);
    }
    addTask(kanbanId, dto) {
        return this.taskService.addTask(kanbanId, dto);
    }
    findById(id) {
        return this.kanbanService.findById(id);
    }
    findAll(req) {
        return this.kanbanService.findAll(req);
    }
};
exports.KanbanController = KanbanController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateDto]),
    __metadata("design:returntype", void 0)
], KanbanController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':kanbanId/add-task'),
    __param(0, (0, common_1.Param)('kanbanId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_task_dto_1.TaskDto]),
    __metadata("design:returntype", void 0)
], KanbanController.prototype, "addTask", null);
__decorate([
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], KanbanController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)('find-all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], KanbanController.prototype, "findAll", null);
exports.KanbanController = KanbanController = __decorate([
    (0, common_1.Controller)('kanban'),
    __metadata("design:paramtypes", [kanban_service_1.KanbanService,
        task_service_1.TaskService])
], KanbanController);
//# sourceMappingURL=kanban.controller.js.map