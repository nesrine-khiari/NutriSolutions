import { inject, Injectable } from '@angular/core';
import { NutritionistModel, StatusEnum } from '../models/nutritionist.model';
// import { generateFakeNutritionist } from '../core/helpers/faker.helper';
import { APP_API } from '../core/constants/constants.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class NutritionistsService {
  private nutritionists: NutritionistModel[] = [];

  #nutritionists: NutritionistModel[] = [];

  apiUrl = APP_API.base_url + '/nutritionists';

  constructor() {}
  http = inject(HttpClient);

  getAllNutritionists(): Observable<NutritionistModel[]> {
    return this.http.get<NutritionistModel[]>(this.apiUrl);
  }
  getBestNutritionists(): Observable<NutritionistModel[]> {
    return this.http.get<NutritionistModel[]>(this.apiUrl + '/top');
  }
  getNutritionistById(id: string): Observable<NutritionistModel> {
    return this.http.get<NutritionistModel>(`${this.apiUrl}/${id}`);
  }
  getPatientsByNutritionist(id: string): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.apiUrl}/${id}/patients`);
  }
  deleteNutritionist(id: string): Observable<{ count: number }> {
    return this.http.delete<{ count: number }>(`${this.apiUrl}/${id}`);
  }
  // addNutritionist(
  //   nutritionnist: NutritionistModel
  // ): Observable<NutritionistModel> {
  //   return this.http.post<NutritionistModel>(this.apiUrl, nutritionnist);
  // }
  updateNutritionist(
    id: string,
    nutritionist: NutritionistModel
  ): Observable<NutritionistModel> {
    return this.http.patch<NutritionistModel>(
      `${this.apiUrl}/${id}`,
      nutritionist
    );
  }

  // getAllNutritionists(): NutritionistModel[] {
  //   return this.nutritionists.length
  //     ? this.nutritionists
  //     : this.generateFakeNutritionistList(15);
  // }
  // // Get all nutritionists
  // getBestNutritionists(): NutritionistModel[] {
  //   return this.generateFakeNutritionistList(4);
  // }

  // generateFakeNutritionistList(count: number): NutritionistModel[] {
  //   return Array.from({ length: count }, () => generateFakeNutritionist());
  // }

  // // Add a new nutritionist
  // addNutritionist(nutritionist: NutritionistModel): void {
  //   this.nutritionists.push(nutritionist);
  // }

  // // Find nutritionist by ID
  // getNutritionistById(id: string): NutritionistModel | undefined {
  //   return this.nutritionists.find((nutritionist) => nutritionist.id === id);
  // }

  // // Update a nutritionist
  // updateNutritionist(
  //   id: string,
  //   updatedData: Partial<NutritionistModel>
  // ): void {
  //   const index = this.nutritionists.findIndex(
  //     (nutritionist) => nutritionist.id === id
  //   );
  //   if (index > -1) {
  //     this.nutritionists[index] = {
  //       ...this.nutritionists[index],
  //       ...updatedData,
  //     };
  //   }
  // }

  // // Delete a nutritionist
  // deleteNutritionist(id: string): void {
  //   this.nutritionists = this.nutritionists.filter(
  //     (nutritionist) => nutritionist.id !== id
  //   );
  // }
}
