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
    id?: string,
    public patientsNumber: number = 0,
    public rating?: number // appointments?: string[],
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
    this.rating = rating ?? 3;
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

export enum StarsCountEnum {
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
}
