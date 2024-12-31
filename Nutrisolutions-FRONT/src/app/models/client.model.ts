import { ObjectifEnum, RecipeModel } from './recipe.model';
import { UserModel } from './user.model';

export class ClientModel extends UserModel {
  constructor(
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    profilePictureUrl: string,
    gender: GenderEnum,
    birthDate: Date,
    role: UserRoleEnum,
    public height: number,
    public weight: number,
    public favoriteRecipes: RecipeModel[] = [],
    public objectif: ObjectifEnum,
    id?: string
  ) {
    super(
      name,
      email,
      password,
      phoneNumber,
      profilePictureUrl,
      gender,
      birthDate,
      role,
      id
    );
  }

  /**
   * Calculates the age of the client based on their birth date.
   * @returns The calculated age as a number.
   */
  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
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

export enum GenderEnum {
  MALE = 'homme',
  FEMALE = 'femme',
}
export enum UserRoleEnum {
  CLIENT = 'client',
  NUTRITIONIST = 'nutritionist',
  ADMIN = 'admin',
}
