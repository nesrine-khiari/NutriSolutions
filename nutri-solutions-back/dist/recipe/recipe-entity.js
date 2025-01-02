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
exports.RecipeEntity = void 0;
const time_stamp_entity_1 = require("../common/db-utilities/time-stamp.entity");
const recipe_enums_1 = require("../enums/recipe-enums");
const client_entity_1 = require("../user/client/client.entity");
const typeorm_1 = require("typeorm");
let RecipeEntity = class RecipeEntity extends time_stamp_entity_1.TimeStampEntity {
};
exports.RecipeEntity = RecipeEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RecipeEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], RecipeEntity.prototype, "ingredients", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], RecipeEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeEntity.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: recipe_enums_1.CategoryEnum,
        default: recipe_enums_1.CategoryEnum.ALL,
    }),
    __metadata("design:type", String)
], RecipeEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: recipe_enums_1.ObjectifEnum,
        default: recipe_enums_1.ObjectifEnum.ALL,
    }),
    __metadata("design:type", String)
], RecipeEntity.prototype, "objectif", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: recipe_enums_1.PreparationTimeEnum,
        default: recipe_enums_1.PreparationTimeEnum.ALL,
    }),
    __metadata("design:type", String)
], RecipeEntity.prototype, "preparationTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RecipeEntity.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeEntity.prototype, "protein", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeEntity.prototype, "fat", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RecipeEntity.prototype, "carbohydrates", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], RecipeEntity.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array'),
    __metadata("design:type", Array)
], RecipeEntity.prototype, "cookingNotes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => client_entity_1.Client, (client) => client.favoriteRecipes),
    __metadata("design:type", Array)
], RecipeEntity.prototype, "favoritedByClient", void 0);
exports.RecipeEntity = RecipeEntity = __decorate([
    (0, typeorm_1.Entity)()
], RecipeEntity);
//# sourceMappingURL=recipe-entity.js.map