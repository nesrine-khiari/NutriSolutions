import { UserEntity } from '../user.entity';
import { NutritionistStatusEnum } from 'src/enums/user-enums';
export declare class Nutritionist extends UserEntity {
    experienceYears: number;
    certificateUrl: string;
    location: string;
    status: NutritionistStatusEnum;
}
