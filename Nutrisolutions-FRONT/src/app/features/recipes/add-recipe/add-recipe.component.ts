import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom } from 'rxjs';
import { AppUtils } from 'src/app/core/utils/functions.utils';
import {
  CategoryEnum,
  ObjectifEnum,
  PreparationTimeEnum,
  RecipeModel,
} from 'src/app/models/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { LoggerService } from 'src/app/services/logger.service';
import { NutritionistsService } from 'src/app/services/nutritionists.service';
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
  nutritionstName: string = '';
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
    this.nutritionstName = recipe.createdBy;
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
    this.logger.debug('Selected image:', selectedImage.name);
  }
  authService = inject(AuthService);
  async createRecipeModel(): Promise<RecipeModel> {
    if (!this.isEditMode) {
      try {
        const response = await firstValueFrom(this.authService.getUserInfos()!);
        this.nutritionstName = response?.name || '';
        this.logger.debug('Nutritionist:', this.nutritionstName);
      } catch (error) {
        this.toastr.error(AppUtils.getErrorMessage(error), 'Erreur');
        throw error; // Or handle error as needed
      }
    }

    return {
      name: this.titleControl.value || '',
      description: this.descriptionControl.value || '',
      ingredients: this.ingredients,
      imageUrl: this.imageUrl,
      calories: parseInt(this.items[3].formControlName.value || '0'),
      category: this.categoryControl.value || CategoryEnum.DINER,
      objectif: this.objectifControl.value || ObjectifEnum.ALL,
      preparationTime: this.preptimeControl.value || PreparationTimeEnum.ALL,
      createdBy: this.nutritionstName,
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
      (!this.imageUrl && !this.imageFile) ||
      !this.ingredients.length ||
      !this.instructions.length ||
      this.items.some((item) => !item.formControlName.value);
    return this.isFormInvalid;
  }

  saveRecipe = () => {
    if (this.isFormInvalid) {
      this.toastr.error('Veuillez remplir tous les champs obligatoires');
    } else {
      if (this.imageFile) {
        // Upload the image first
        this.uploadImageService.uploadImage(this.imageFile).subscribe({
          next: (response) => {
            this.logger.debug('Upload Success:', response);
            this.imageUrl = response.path;
            this.processRecipe(); // Handle the recipe after uploading the image
          },
          error: (err) => {
            this.logger.error('Upload Failed:', err);
            this.toastr.error("Échec du téléchargement de l'image. Veuillez réessayer.");
          },
        });
      } else {
        this.processRecipe();
      }
    }
  };

  private async processRecipe() {
    const newRecipe = await this.createRecipeModel();

    if (this.isEditMode) {
      newRecipe.id = this.recipe?.id; // Ensure the ID is set for updating
      this.logger.info('Edit Recipe:', newRecipe);
      this.recipesService.updateRecipe(newRecipe.id!, newRecipe).subscribe({
        next: () => {
          this.toastr.success('Recette mise à jour avec succès');
          this.router.navigate(['/recipes/recipe-details', newRecipe.id]);
        },
        error: (err) => {
          this.logger.error('Update Failed:', err);
          this.toastr.error('Échec de la mise à jour de la recette');
        },
      });
    } else {
      this.logger.info('Add Recipe:', newRecipe);
      this.recipesService.addRecipe(newRecipe).subscribe({
        next: (addedRecipe) => {
          this.toastr.success('Recette ajoutée avec succès');
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          this.logger.error('Add Failed:', err);
          this.toastr.error('Échec de l\'ajout de la recette');
        },
      });
    }
  }
}
