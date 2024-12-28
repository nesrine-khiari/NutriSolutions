import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  titleControl: FormControl = new FormControl('');
  desciprtionControl: FormControl = new FormControl('');
  categoryControl!: FormControl;
  objectifControl!: FormControl;
  preptimeControl!: FormControl;
  recipesService = inject(RecipesService);
  toastr = inject(ToastrService);
  logger = inject(LoggerService);
  objectifOptions = Object.values(ObjectifEnum).filter(
    (objectif) => objectif != ObjectifEnum.ALL
  );
  preptimeOptions = Object.values(PreparationTimeEnum).filter(
    (preptime) => preptime != PreparationTimeEnum.ALL
  );
  ingredients: string[] = [];
  instructions: string[] = [];
  notes: string[] = [];

  updateDetails(listToUpdate: string[], newList: string[]) {
    listToUpdate.splice(0, listToUpdate.length, ...newList);
  }

  ngOnInit() {
    this.categoryControl = new FormControl(CategoryEnum.DINER);
    this.objectifControl = new FormControl(ObjectifEnum.PERDRE_POIDS);
    this.preptimeControl = new FormControl(PreparationTimeEnum.VERY_SHORT);
  }

  categoryOptions = Object.values(CategoryEnum).filter(
    (category) => category != CategoryEnum.ALL
  );

  items = [
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

  imageFile?: File;
  imageUrl: string = '';
  uploadImageService = inject(FileUploadService);
  selectImage(selectedImage: File) {
    this.imageFile = selectedImage;
    console.log('selectina immgae ' + selectedImage.name);
  }

  createRecipeModel(): RecipeModel {
    const recipe: RecipeModel = {
      name: this.titleControl.value,
      description: this.desciprtionControl.value, //
      ingredients: this.ingredients, // Collect ingredient values
      imageUrl: this.imageUrl, // Set image URL if available
      calories: parseInt(
        this.items.find((item) => item.placeholder === 'Calorie (Kcal)')
          ?.formControlName.value ?? '0'
      ),
      category: this.categoryControl.value,
      objectif: this.objectifControl.value,
      preparationTime: this.preptimeControl.value,
      createdBy: 'user-id', // This should come from the logged-in user
      createdAt: new Date(),
      protein: parseInt(
        this.items.find((item) => item.placeholder === 'Proteins (g)')
          ?.formControlName.value ?? '0'
      ),

      fat: parseInt(
        this.items.find((item) => item.placeholder === 'Lipides (g)')
          ?.formControlName.value ?? '0'
      ),

      carbohydrates: parseInt(
        this.items.find((item) => item.placeholder === 'Glucides (g)')
          ?.formControlName.value ?? '0'
      ),

      instructions: this.instructions, // You can add a form control for instructions if needed
      cookingNotes: this.notes, // Add form controls for cooking notes if necessary
    };

    return recipe;
  }

  isButtonDisabled() {
    return (
      this.titleControl.valid &&
      this.objectifControl.valid &&
      this.categoryControl.valid &&
      this.desciprtionControl.valid &&
      this.imageFile != null
    );
  }

  // Example of submitting the form data
  onSubmit = () => {
    if (this.imageFile) {
      this.uploadImageService.uploadImage('recipe', this.imageFile).subscribe({
        next: (response) => {
          this.imageUrl = response.path;
          console.log(this.imageUrl);
        },
        error: (err) => {
          console.error('Upload Failed');
        },
      });
    }
    const newRecipe: RecipeModel = this.createRecipeModel();
    this.recipesService.addRecipe(newRecipe).subscribe({
      next: (addedRecipe) => {
        this.toastr.success('Recipe Added Successfully');
        //TODO: toastr
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Failed adding Recipe');

        //TODO: toastr
      },
    });
    console.log(newRecipe); // Send this object to your API or handle it as needed
  };
}
