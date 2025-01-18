import { TimeStampEntity } from 'src/common/db-utilities/time-stamp.entity';
import { GenderEnum, UserRoleEnum } from 'src/enums/user-enums';
export declare class UserEntity extends TimeStampEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    profilePictureUrl: string;
    gender: GenderEnum;
    birthDate: Date;
    role: UserRoleEnum;
}
