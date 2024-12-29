import { GenderEnum, UserRoleEnum } from './client.model';
import { UserModel } from './user.model';

export class NutritionistModel extends UserModel {
  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    profilePictureUrl: string,
    gender: GenderEnum,
    birthDate: Date,
    role: UserRoleEnum,
    public patientsNumber: number,
    public experienceYears: number,
    public certificateUrl: string,
    public status: StatusEnum,
    public location?: string
  ) // ratings: number,
  // appointments?: string[],

  {
    super(
      id,
      name,
      email,
      password,
      phoneNumber,
      profilePictureUrl,
      gender,
      birthDate,
      role
    );
  }
}

export enum TrieEnum {
  ALL = 'Tous',
  PlusRecents = 'Plus Récents',
  PlusAnciens = 'Plus Anciens',
}
export enum StatusEnum {
  Approved = 'Approuvé',
  Rejected = 'Rejeté',
  Waiting = 'En attente',
}
export enum StatusEnumFilter {
  ALL = 'Tous',
  Approved = 'Approuvé',
  Rejected = 'Rejeté',
  Waiting = 'En attente',
}
