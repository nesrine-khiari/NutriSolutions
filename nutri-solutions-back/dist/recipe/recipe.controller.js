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
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const recipe_service_1 = require("./recipe.service");
const create_recipe_dto_1 = require("./dtos/create-recipe.dto");
const update_recipe_dto_1 = require("./dtos/update-recipe.dto");
const role_guard_1 = require("../auth/guards/role.guard");
const user_enums_1 = require("../enums/user-enums");
let RecipeController = class RecipeController {
    constructor(recipesService) {
        this.recipesService = recipesService;
    }
    async create(createRecipeDto) {
        return this.recipesService.create(createRecipeDto);
    }
    async findAll() {
        return this.recipesService.findAll();
    }
    async findOne(id) {
        return this.recipesService.findOne(id);
    }
    async update(id, updateRecipeDto) {
        return this.recipesService.update(id, updateRecipeDto);
    }
    async remove(id) {
        return this.recipesService.remove(id);
    }
};
exports.RecipeController = RecipeController;
__decorate([
    (0, role_guard_1.Roles)(user_enums_1.UserRoleEnum.NUTRITIONIST),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_recipe_dto_1.CreateRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "findOne", null);
__decorate([
    (0, role_guard_1.Roles)(user_enums_1.UserRoleEnum.NUTRITIONIST),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_recipe_dto_1.UpdateRecipeDto]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "update", null);
__decorate([
    (0, role_guard_1.Roles)(user_enums_1.UserRoleEnum.NUTRITIONIST),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "remove", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipe_service_1.RecipesService])
], RecipeController);
//# sourceMappingURL=recipe.controller.js.map