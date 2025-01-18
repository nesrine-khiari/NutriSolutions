import { CategoryEnum, ObjectifEnum, PreparationTimeEnum } from 'src/enums/recipe-enums';
export declare class CreateRecipeDto {
    name: string;
    description: string;
    ingredients: string[];
    imageUrl: string;
    calories: number;
    category: CategoryEnum;
    objectif: ObjectifEnum;
    preparationTime: PreparationTimeEnum;
    createdBy: string;
    createdAt: Date;
    protein: number;
    fat: number;
    carbohydrates: number;
    instructions: string[];
    cookingNotes: string[];
}
