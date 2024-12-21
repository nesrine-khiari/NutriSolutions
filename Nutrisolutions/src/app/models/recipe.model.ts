export interface RecipeModel {
  id: string; // Unique identifier for the recipe
  name: string; // Name of the recipe
  description: string; // Brief description of the recipe
  ingredients: string[]; // List of ingredients
  preparationTime: string; // Preparation time (e.g., "30 minutes")
  cookingTime: string; // Cooking time (e.g., "45 minutes")
  totalTime: string; // Total time (preparation + cooking)
  servings: number; // Number of servings
  instructions: string[]; // Steps to prepare the recipe
  cuisine: string; // Cuisine type (e.g., Italian, Mexican)
  difficulty: string; // Difficulty level (e.g., Easy, Medium, Hard)
  imageUrl: string; // Optional image URL for the recipe
  calories: number;
  category: CategoryEnum;
  objectif: ObjectifEnum;
}

export enum ObjectifEnum {
  ALL = 'Tous',

  PERDRE_POIDS = 'Perdre du poids',
  PRENDRE_POIDS = 'Prendre du poids',
  MUSCLER = 'Se muscler',
  MAINTENIR_POIDS = 'Maintenir le poids',
}
export enum CategoryEnum {
  ALL = 'Tous',
  DINER = 'Diner',
  DEJ = 'Déjeuner',
  PETIT_DEJ = 'Petit Déjeuner',
  SNACK = 'Snack',
  ENTREE = 'Entrée',
  PRINCIPAL = 'Plat principal',
}
export enum ExperienceEnum {
  ALL = 'Tous',
  JUNIOR = '1-3 ans',
  MID_LEVEL = '4-6 ans',
  SENIOR = '7-10 ans',
  SENIOR_PLUS = 'Plus de 10 ans',
}
