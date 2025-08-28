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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const add_task_dto_1 = require("../kanban/dto/add-task.dto");
const __generated__1 = require("../../prisma/__generated__/index.js");
var TaskStatus = __generated__1.$Enums.TaskStatus;
let TaskController = class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    create(kanbanId, dto) {
        return this.taskService.addTask(kanbanId, dto);
    }
    move(kanbanId, activeTaskId, overTaskId) {
        return this.taskService.moveTasks(kanbanId, activeTaskId, overTaskId);
    }
    moveTasksDiffCols(kanbanId, activeTaskId, overStatus, newOrder) {
        return this.taskService.moveTasksDiffColumns(kanbanId, activeTaskId, overStatus, newOrder);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(':kanbanId/add-task'),
    __param(0, (0, common_1.Param)('kanbanId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_task_dto_1.TaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':kanbanId/move-tasks'),
    __param(0, (0, common_1.Param)('kanbanId')),
    __param(1, (0, common_1.Body)('activeTaskId')),
    __param(2, (0, common_1.Body)('overTaskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "move", null);
__decorate([
    (0, common_1.Post)(':kanbanId/move-tasks-diff-cols'),
    __param(0, (0, common_1.Param)('kanbanId')),
    __param(1, (0, common_1.Body)('activeTaskId')),
    __param(2, (0, common_1.Body)('overStatus')),
    __param(3, (0, common_1.Body)('newOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "moveTasksDiffCols", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map