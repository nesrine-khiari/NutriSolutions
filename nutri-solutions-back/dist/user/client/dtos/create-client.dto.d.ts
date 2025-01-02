import { ObjectifEnum } from 'src/enums/recipe-enums';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
export declare class CreateClientDto extends CreateUserDto {
    objectif: ObjectifEnum;
    weight: number;
    height: number;
}
