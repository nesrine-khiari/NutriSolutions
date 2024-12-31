import { GenderEnum, UserRoleEnum } from './client.model';
import { UserModel } from './user.model';

export class NutritionistModel extends UserModel {
  constructor(
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    profilePictureUrl: string,
    gender: GenderEnum,
    birthDate: Date,
    role: UserRoleEnum,
    
    public experienceYears: number,
    public certificateUrl: string,
    public status: StatusEnum,
    public location?: string,
    id?: string ,
    public patientsNumber: number=0,
  ) // appointments?: string[],

  {
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
