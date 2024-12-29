import { IsEnum, IsNumber } from 'class-validator';
import { ObjectifEnum } from 'src/enums/recipe-enums';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';

export class CreateClientDto extends CreateUserDto {
  @IsEnum(ObjectifEnum)
  objectif: ObjectifEnum;

  @IsNumber()
  weight: number;

  @IsNumber()
  height: number;
}
