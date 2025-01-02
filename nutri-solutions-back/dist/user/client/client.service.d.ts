import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { UserService } from '../user.service';
import { UserEntity } from '../user.entity';
export declare class ClientService extends UserService {
    private readonly clientRepository;
    private readonly recipeRepository;
    protected readonly userRepository: Repository<UserEntity>;
    constructor(clientRepository: Repository<Client>, recipeRepository: Repository<RecipeEntity>, userRepository: Repository<UserEntity>);
    findAll(): Promise<Client[]>;
    findOneById(id: string): Promise<Client>;
    addFavoriteRecipe(clientId: string, recipeId: string): Promise<Client>;
    getFavouriteRecipes(clientId: string): Promise<RecipeEntity[]>;
    removeFavoriteRecipe(clientId: string, recipeId: string): Promise<Client>;
}
