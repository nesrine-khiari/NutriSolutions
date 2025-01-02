import { NutritionistStatusEnum } from 'src/enums/user-enums';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
export declare class CreateNutritionistDto extends CreateUserDto {
    experienceYears: number;
    certificateUrl: string;
    location: string;
    status: NutritionistStatusEnum;
}
