import { ObjectifEnum, RecipeModel } from './recipe.model';

export class ClientModel {
  constructor(
    private id: string,
    public name: string,
    public email: string,
    public phone: string,
    public profilePictureUrl: string, // Optional
    public gender: 'Male' | 'Female',
    public date: Date,
    public height: number,
    public weight: number,
    public favoriteRecipes: RecipeModel[],
    public objectif: ObjectifEnum,
    public appointments: string[]
  ) {}
  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}

export enum UserType {
  CLIENT = 'client',
  NUTRITIONIST = 'nutritionist',
  ADMIN = 'admin',
}
