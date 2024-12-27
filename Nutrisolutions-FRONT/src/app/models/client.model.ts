import { ObjectifEnum, RecipeModel } from './recipe.model';

export interface ClientModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePictureUrl: string; // Optional
  gender: 'Male' | 'Female';
  address?: string;
  age: number;
  height: number;
  weight: number;
  favoriteRecipes?: RecipeModel[];
  objectif: ObjectifEnum;
  appointments: string[];
}
