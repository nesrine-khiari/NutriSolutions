import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import { CategoryEnum, ObjectifEnum, PreparationTimeEnum } from 'src/enums/recipe-enums';
import { Client } from 'src/user/client/client.entity';
export declare class RecipeEntity extends TimeStampEntity {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    imageUrl: string;
    calories: number;
    category: CategoryEnum;
    objectif: ObjectifEnum;
    preparationTime: PreparationTimeEnum;
    createdBy: string;
    protein: number;
    fat: number;
    carbohydrates: number;
    instructions: string[];
    cookingNotes: string[];
    favoritedByClient: Client[];
}
