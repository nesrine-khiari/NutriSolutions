import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { RecipeEntity } from './recipe-entity';
export declare class RecipesService {
    private recipeRepository;
    constructor(recipeRepository: Repository<RecipeEntity>);
    create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity>;
    findAll(): Promise<RecipeEntity[]>;
    findOne(id: string): Promise<RecipeEntity>;
    update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity>;
    remove(id: string): Promise<void>;
}
