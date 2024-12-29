import { GenderEnum, UserRoleEnum } from './client.model';

export class UserModel {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    private password: string,
    public phoneNumber: string,
    public profilePictureUrl: string,
    public gender: GenderEnum,
    public birthDate: Date,
    public role: UserRoleEnum
  ) {}
}
