import { UserEntity } from '../user.entity';
import { ActivityLevelEnum, ObjectifEnum } from 'src/enums/recipe-enums';
import { RecipeEntity } from 'src/recipe/recipe-entity';
export declare class Client extends UserEntity {
    objectif: ObjectifEnum;
    activityLevel: ActivityLevelEnum;
    weight: number;
    height: number;
    favoriteRecipes: RecipeEntity[];
}
