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
}
