import { GenderEnum } from 'src/enums/user-enums';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsDate,
  IsNumber,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'ResetToken is required' })
  resetToken: string;

  @IsString()
  @IsNotEmpty({ message: 'Old Password is required' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'New Password is required' })
  newPassword: string;
}
