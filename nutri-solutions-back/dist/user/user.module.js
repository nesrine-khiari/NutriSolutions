"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const client_entity_1 = require("./client/client.entity");
const nutritionist_entity_1 = require("./nutritionist/nutritionist.entity");
const admin_entity_1 = require("./admin/admin.entity");
const client_service_1 = require("./client/client.service");
const nutritionist_service_1 = require("./nutritionist/nutritionist.service");
const recipe_entity_1 = require("../recipe/recipe-entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [user_service_1.UserService, client_service_1.ClientService, nutritionist_service_1.NutritionistService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.UserEntity,
                client_entity_1.Client,
                nutritionist_entity_1.Nutritionist,
                recipe_entity_1.RecipeEntity,
                admin_entity_1.AdminEntity,
            ]),
        ],
        exports: [user_service_1.UserService, client_service_1.ClientService, nutritionist_service_1.NutritionistService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map