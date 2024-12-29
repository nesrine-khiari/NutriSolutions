import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ObjectifEnum } from 'src/enums/recipe-enums';
import { NutritionistStatusEnum } from 'src/enums/user-enums';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

export class CreateNutritionistDto extends CreateUserDto {
  @IsNumber()
  experienceYears: number;

  @IsString()
  certificate: string;
  @IsString()
  location: string;

  @IsNumber()
  height: number;

  @IsEnum(NutritionistStatusEnum)
  status: NutritionistStatusEnum;
}
