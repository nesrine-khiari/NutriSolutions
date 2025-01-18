import { RecipesService } from './recipe.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
export declare class RecipeController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    create(createRecipeDto: CreateRecipeDto): Promise<import("./recipe-entity").RecipeEntity>;
    findAll(): Promise<import("./recipe-entity").RecipeEntity[]>;
    findOne(id: string): Promise<import("./recipe-entity").RecipeEntity>;
    update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<import("./recipe-entity").RecipeEntity>;
    remove(id: string): Promise<void>;
}
