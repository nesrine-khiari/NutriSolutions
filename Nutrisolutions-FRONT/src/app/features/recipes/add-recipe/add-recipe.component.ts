import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  CategoryEnum,
  ObjectifEnum,
  PreparationTimeEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LoggerService } from 'src/app/services/logger.service';
import { RecipesService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: [
    './add-recipe.component.css',
    '../../../../assets/css/list-common.css',
  ],
})
export class AddRecipeComponent {
  recipe: RecipeModel | null = null;
  items: {
    image: string;
    placeholder: string;
    formControlName: FormControl<string | null>;
  }[] = [];
  isEditMode: boolean = false;
  titleControl = new FormControl('');
  descriptionControl = new FormControl('');
  categoryControl = new FormControl<CategoryEnum>(CategoryEnum.DINER);
  objectifControl = new FormControl<ObjectifEnum>(ObjectifEnum.PERDRE_POIDS);
  preptimeControl = new FormControl<PreparationTimeEnum>(
    PreparationTimeEnum.VERY_SHORT
  );
  recipesService = inject(RecipesService);
  toastr = inject(ToastrService);
  logger = inject(LoggerService);
  router = inject(Router);
  ingredients: string[] = [];
  instructions: string[] = [];
  notes: string[] = [];
  imageFile?: File;
  imageUrl: string = '';
  uploadImageService = inject(FileUploadService);

  categoryOptions = Object.values(CategoryEnum).filter(
    (category) => category !== CategoryEnum.ALL
  );
  objectifOptions = Object.values(ObjectifEnum).filter(
    (objectif) => objectif !== ObjectifEnum.ALL
  );
  preptimeOptions = Object.values(PreparationTimeEnum).filter(
    (preptime) => preptime !== PreparationTimeEnum.ALL
  );

  ngOnInit() {
    this.items = [
      {
        image: 'assets/images/proteins.png',
        placeholder: 'Proteins (g)',
        formControlName: new FormControl(''),
      },
      {
        image: 'assets/images/lipid.png',
        placeholder: 'Lipides (g)',
        formControlName: new FormControl(''),
      },
      {
        image: 'assets/images/carbohydrate.png',
        placeholder: 'Glucides (g)',
        formControlName: new FormControl(''),
      },
      {
        image: 'assets/images/calories.png',
        placeholder: 'Calorie (Kcal)',
        formControlName: new FormControl(''),
      },
    ];

    this.recipe = history.state.recipe;
    this.logger.info('Recipe:', this.recipe);

    if (this.recipe) {
      this.isEditMode = true;
      this.initializeForm(this.recipe);
    }
  }

  initializeForm(recipe: RecipeModel) {
    this.imageUrl = recipe.imageUrl;
    this.titleControl.setValue(recipe.name);
    this.descriptionControl.setValue(recipe.description);
    this.categoryControl.setValue(recipe.category);
    this.objectifControl.setValue(recipe.objectif);
    this.preptimeControl.setValue(recipe.preparationTime);
    this.updateDetails(this.ingredients, recipe.ingredients);
    this.updateDetails(this.instructions, recipe.instructions);
    this.updateDetails(this.notes, recipe.cookingNotes);
    this.logger.info('hola form with recipe:', this.ingredients);
    const nutrients = [
      recipe.protein,
      recipe.fat,
      recipe.carbohydrates,
      recipe.calories,
    ];
    this.items.forEach((item, index) => {
      item.formControlName.setValue(nutrients[index]?.toString() || '0');
    });
  }

  updateDetails(listToUpdate: string[], newList: string[]) {
    listToUpdate.splice(0, listToUpdate.length, ...newList);
  }

  selectImage(selectedImage: File) {
    this.imageFile = selectedImage;
    console.log('Selected image:', selectedImage.name);
  }

  createRecipeModel(): RecipeModel {
    return {
      name: this.titleControl.value || '',
      description: this.descriptionControl.value || '',
      ingredients: this.ingredients,
      imageUrl: this.imageUrl,
      calories: parseInt(this.items[3].formControlName.value || '0'),
      category: this.categoryControl.value || CategoryEnum.DINER,
      objectif: this.objectifControl.value || ObjectifEnum.ALL,
      preparationTime: this.preptimeControl.value || PreparationTimeEnum.ALL,
      createdBy: 'user-id',
      createdAt: this.isEditMode ? this.recipe!.createdAt : new Date(),
      protein: parseInt(this.items[0].formControlName.value || '0'),
      fat: parseInt(this.items[1].formControlName.value || '0'),
      carbohydrates: parseInt(this.items[2].formControlName.value || '0'),
      instructions: this.instructions,
      cookingNotes: this.notes,
    };
  }
  isFormInvalid: boolean = true;
  isButtonDisabled() {
    this.isFormInvalid =
      !this.titleControl.value ||
      !this.objectifControl.value ||
      !this.categoryControl.value ||
      !this.descriptionControl.value ||
      !this.imageUrl ||
      !this.ingredients.length ||
      !this.instructions.length ||
      this.items.some((item) => !item.formControlName.value);

    return this.isFormInvalid;
  }

  saveRecipe = () => {
    if (this.isFormInvalid) {
      this.toastr.error('Please fill all the required fields');
    } else {
      if (this.imageFile) {
        // Upload the image first
        this.uploadImageService
          .uploadImage('recipe', this.imageFile)
          .subscribe({
            next: (response) => {
              this.imageUrl = response.path;
              this.processRecipe(); // Handle the recipe after uploading the image
            },
            error: (err) => {
              console.error('Upload Failed:', err);
              this.toastr.error('Image upload failed. Please try again.');
            },
          });
      } else {
        this.processRecipe();
      }
    }
  };

  private processRecipe() {
    const newRecipe: RecipeModel = this.createRecipeModel();

    if (this.isEditMode) {
      newRecipe.id = this.recipe?.id; // Ensure the ID is set for updating
      this.logger.info('Edit Recipe:', newRecipe);
      this.recipesService.updateRecipe(newRecipe.id!, newRecipe).subscribe({
        next: () => {
          this.toastr.success('Recipe updated successfully');
          this.router.navigate(['/recipes/recipe-details', newRecipe.id]);
        },
        error: (err) => {
          console.error('Update Failed:', err);
          this.toastr.error('Failed to update recipe');
        },
      });
    } else {
      this.logger.info('Add Recipe:', newRecipe);
      this.recipesService.addRecipe(newRecipe).subscribe({
        next: (addedRecipe) => {
          this.toastr.success('Recipe added successfully');
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          console.error('Add Failed:', err);
          this.toastr.error('Failed to add recipe');
        },
      });
    }
  }
}
