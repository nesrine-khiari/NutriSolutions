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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const client_entity_1 = require("./client.entity");
const recipe_entity_1 = require("../../recipe/recipe-entity");
const user_service_1 = require("../user.service");
const user_entity_1 = require("../user.entity");
let ClientService = class ClientService extends user_service_1.UserService {
    constructor(clientRepository, recipeRepository, userRepository) {
        super(userRepository);
        this.clientRepository = clientRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }
    async findAll() {
        return this.clientRepository.find({
            relations: ['favoriteRecipes'],
        });
    }
    async findOneById(id) {
        const client = await this.clientRepository.findOne({
            where: { id },
            relations: ['favoriteRecipes'],
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${id} not found`);
        }
        return client;
    }
    async addFavoriteRecipe(clientId, recipeId) {
        const client = await this.findOneById(clientId);
        const recipe = await this.recipeRepository.findOne({
            where: { id: recipeId },
        });
        if (!recipe) {
            throw new common_1.NotFoundException(`Recipe with ID ${recipeId} not found`);
        }
        if (!client.favoriteRecipes.some((r) => r.id === recipe.id)) {
            client.favoriteRecipes.push(recipe);
            await this.clientRepository.save(client);
        }
        return client;
    }
    async getFavouriteRecipes(clientId) {
        const client = await this.clientRepository.findOne({
            where: { id: clientId },
        });
        if (!client) {
            throw new common_1.NotFoundException(`Client with ID ${clientId} not found`);
        }
        const recipes = client.favoriteRecipes;
        return recipes;
    }
    async removeFavoriteRecipe(clientId, recipeId) {
        const client = await this.findOneById(clientId);
        const recipeIndex = client.favoriteRecipes.findIndex((r) => r.id === recipeId);
        if (recipeIndex === -1) {
            throw new common_1.NotFoundException(`Recipe with ID ${recipeId} is not in the client's favorites`);
        }
        client.favoriteRecipes.splice(recipeIndex, 1);
        await this.clientRepository.save(client);
        return client;
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.RecipeEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ClientService);
//# sourceMappingURL=client.service.js.map