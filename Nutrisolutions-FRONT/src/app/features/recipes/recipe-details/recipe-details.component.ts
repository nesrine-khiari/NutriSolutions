import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { APP_API } from 'src/app/core/constants/constants.config';
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
  base_url = APP_API.base_url;
  recipe!: RecipeModel;
  items: { image: string; content: string }[] = []; // Additional recipe details
  recipeId: string | null = '';
  route = inject(ActivatedRoute);
  router = inject(Router);
  toastr = inject(ToastrService);
  buttons = [
    {
      image: 'assets/images/downloads.png',
      text: 'Download recipe',
    },
    {
      image: 'assets/images/favourite.png',
      text: 'Add to favorite',
    },
    // { image: 'assets/images/question.png', text: 'Ask question' },
    {
      image: 'assets/images/question.png',
      text: 'Edit Recipe',
    },
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
    this.recipeId = this.route.snapshot.paramMap.get('id');
    console.log('Recipe ID:', this.recipeId);
    this.loadRecipe(this.recipeId || '');
  }

  private loadRecipe(id: string): void {
    this.recipesService.getRecipeById(id).subscribe((recipe: RecipeModel) => {
      this.recipe = recipe;
      this.populateItems();
    });
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
  deleteRecipe() {
    if (this.recipeId) {
      this.recipesService.deleteRecipe(this.recipeId).subscribe(
        (response) => {
          this.toastr.success('Recipe deleted successfully');
          this.router.navigate(['/recipes']);
        },
        (error) => {
          this.toastr.error('Error deleting recipe');
          console.error('Error deleting recipe:', error);
        }
      );
    }
  }
}
