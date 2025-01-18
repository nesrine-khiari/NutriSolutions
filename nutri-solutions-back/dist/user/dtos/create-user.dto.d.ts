import { GenderEnum, UserRoleEnum } from 'src/enums/user-enums';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    profilePictureUrl?: string;
    gender?: GenderEnum;
    birthDate: Date;
    weight: number;
    height: number;
    role: UserRoleEnum;
}
