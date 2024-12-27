
export interface RecipeModel {
  id: string; // Unique identifier for the recipe
  name: string; // Name of the recipe
  description: string; // Brief description of the recipe
  ingredients: string[]; // List of ingredients
  imageUrl: string; // Optional image URL for the recipe
  calories: number; // Calories in the recipe
  category: CategoryEnum; // Recipe category
  objectif: ObjectifEnum; // Recipe objective
  preparationTime: PreparationTimeEnum; // Preparation time
  createdBy: string; // User who created the recipe
  createdAt: Date; // Timestamp when the recipe was created
  protein: number; // Protein content in grams
  fat: number; // Fat content in grams
  carbohydrates: number; // Carbohydrates content in grams
  instructions: string[]; 
  cookingNotes: string[]; 
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

export enum PreparationTimeEnum {
  ALL = 'Tous',
  VERY_SHORT = 'Moins de 15 minutes',
  SHORT = '15-30 minutes',
  MEDIUM = '30-45 minutes',
  LONG = '45-60 minutes',
  VERY_LONG = 'Plus de 60 minutes',
}
export enum ExperienceEnum {
  ALL = 'Tous',
  JUNIOR = '1-3 ans',
  MID_LEVEL = '4-6 ans',
  SENIOR = '7-10 ans',
  SENIOR_PLUS = 'Plus de 10 ans',
}
