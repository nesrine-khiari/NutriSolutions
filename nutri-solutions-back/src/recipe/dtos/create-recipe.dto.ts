// src/recipes/dtos/create-recipe.dto.ts
import {
  IsString,
  IsArray,
  IsEnum,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import {
  CategoryEnum,
  ObjectifEnum,
  PreparationTimeEnum,
} from 'src/enums/recipe-enums';

export class CreateRecipeDto {
  @IsString()
  name: string;
  @IsString()
  description: string;

  @IsArray()
  ingredients: string[];

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsNumber()
  calories: number;

  @IsEnum(CategoryEnum)
  category: CategoryEnum;

  @IsEnum(ObjectifEnum)
  objectif: ObjectifEnum;

  @IsEnum(PreparationTimeEnum)
  preparationTime: PreparationTimeEnum;

  @IsString()
  createdBy: string;

  @IsDateString()
  createdAt: Date;

  @IsNumber()
  protein: number;

  @IsNumber()
  fat: number;

  @IsNumber()
  carbohydrates: number;

  @IsArray()
  instructions: string[];

  @IsArray()
  cookingNotes: string[];
}
