import { Component, OnInit, inject } from '@angular/core';
import { RecipeModel } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: [
    './recipe-details.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class RecipeDetailsComponent implements OnInit {
  recipe?: RecipeModel; // Recipe details
  items: { image: string; content: string }[] = []; // Additional recipe details

  buttons = [
    { image: 'assets/images/downloads.png', text: 'Download recipe' },
    { image: 'assets/images/favourite.png', text: 'Add to favorite' },
    { image: 'assets/images/question.png', text: 'Ask question' },
  ];

  private recipesService = inject(RecipesService);

  checkedInstructions: Set<number> = new Set(); // Set to track checked instructions

  // Method to toggle the instruction state (checked or unchecked)
  toggleInstruction(index: number): void {
    if (this.checkedInstructions.has(index)) {
      this.checkedInstructions.delete(index); // Uncheck if already checked
    } else {
      this.checkedInstructions.add(index); // Check the instruction
    }
  }

  // Method to check if the instruction is checked
  isInstructionChecked(index: number): boolean {
    return this.checkedInstructions.has(index);
  }

  ngOnInit(): void {
    this.loadRecipe();
  }

  private loadRecipe(): void {
    const recipes = this.recipesService.generateFakeRecipesList(1);
    if (recipes.length > 0) {
      this.recipe = recipes[0];
      this.populateItems();
    }
  }

  private populateItems(): void {
    if (!this.recipe) return;

    this.items = [
      {
        image: 'assets/images/doctor.png',
        content: this.recipe.createdBy || 'Unknown',
      },
      {
        image: 'assets/images/goal.png',
        content: this.recipe.objectif || 'No objective provided',
      },
      {
        image: 'assets/images/chef.png',
        content: this.recipe.category || 'Uncategorized',
      },
      {
        image: 'assets/images/meal.png',
        content: this.recipe.preparationTime || 'N/A',
      },
      {
        image: 'assets/images/proteins.png',
        content: `${this.recipe.protein || 0} grammes`,
      },
      {
        image: 'assets/images/lipid.png',
        content: `${this.recipe.fat || 0} grammes`,
      },
      {
        image: 'assets/images/carbohydrate.png',
        content: `${this.recipe.carbohydrates || 0} grammes`,
      },
      {
        image: 'assets/images/calories.png',
        content: `${this.recipe.calories || 0} calories`,
      },
    ];
  }
}
