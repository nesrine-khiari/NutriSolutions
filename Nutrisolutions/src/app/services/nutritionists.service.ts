import { Injectable } from '@angular/core';
import { NutritionistModel } from '../models/nutritionist.model';
import { generateFakeNutritionist } from '../core/helpers/faker.helper';

@Injectable({
  providedIn: 'root',
})
export class NutritionistsService {
  private nutritionists: NutritionistModel[] = [];

  constructor() {}

  // Get all nutritionists
  getAllNutritionists(): NutritionistModel[] {
    return this.nutritionists.length
      ? this.nutritionists
      : this.generateFakeNutritionistList(15);
  }

  generateFakeNutritionistList(count: number): NutritionistModel[] {
    return Array.from({ length: count }, () => generateFakeNutritionist());
  }

  // Add a new nutritionist
  addNutritionist(nutritionist: NutritionistModel): void {
    this.nutritionists.push(nutritionist);
  }

  // Find nutritionist by ID
  getNutritionistById(id: string): NutritionistModel | undefined {
    return this.nutritionists.find((nutritionist) => nutritionist.id === id);
  }

  // Update a nutritionist
  updateNutritionist(
    id: string,
    updatedData: Partial<NutritionistModel>
  ): void {
    const index = this.nutritionists.findIndex(
      (nutritionist) => nutritionist.id === id
    );
    if (index > -1) {
      this.nutritionists[index] = {
        ...this.nutritionists[index],
        ...updatedData,
      };
    }
  }

  // Delete a nutritionist
  deleteNutritionist(id: string): void {
    this.nutritionists = this.nutritionists.filter(
      (nutritionist) => nutritionist.id !== id
    );
  }
}
