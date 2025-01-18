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
exports.Client = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user.entity");
const recipe_enums_1 = require("../../enums/recipe-enums");
const recipe_entity_1 = require("../../recipe/recipe-entity");
let Client = class Client extends user_entity_1.UserEntity {
};
exports.Client = Client;
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: recipe_enums_1.ObjectifEnum,
        default: recipe_enums_1.ObjectifEnum.ALL,
    }),
    __metadata("design:type", String)
], Client.prototype, "objectif", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: recipe_enums_1.ActivityLevelEnum,
        default: recipe_enums_1.ActivityLevelEnum.LEG_ACTIF,
    }),
    __metadata("design:type", String)
], Client.prototype, "activityLevel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Client.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Client.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => recipe_entity_1.RecipeEntity, (recipe) => recipe.favoritedByClient),
    (0, typeorm_1.JoinTable)({
        name: 'favorite_recipes',
        joinColumn: { name: 'client_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
    }),
    __metadata("design:type", Array)
], Client.prototype, "favoriteRecipes", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.ChildEntity)()
], Client);
//# sourceMappingURL=client.entity.js.map