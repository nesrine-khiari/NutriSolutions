import { IsUUID, IsDateString, IsNotEmpty, IsString, isBoolean, IsBoolean } from 'class-validator';

export class CreateUnavailableSlotDto {
  @IsDateString()
  @IsNotEmpty()
  date: string; // ISO 8601 date format

  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsUUID()
  @IsNotEmpty()
  nutritionistId: string;

  @IsBoolean()
  isReserved: boolean;
}
