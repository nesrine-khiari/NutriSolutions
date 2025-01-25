import { ObjectifEnum, RecipeModel } from './recipe.model';
import { SlotModel } from './slot.model';
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
    public activityLevel: ActivityLevelEnum,
    public reservedSlots: SlotModel[] = [],
    public reservedSlotsCount: number = 0,
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
  getClientAge(): number {
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
  CLIENT = 'Client',
  NUTRITIONIST = 'Nutritionist',
  ADMIN = 'Admin',
}

export enum ActivityLevelEnum {
  SEDENTAIRE = 'Sédentaire',
  LEG_ACTIF = 'Légèrement actif',
  MOD_ACTIF = 'Modérément actif',
  TRES_ACTIF = 'Très actif',
  EXT_ACTIF = 'Extrêmement actif',
}
