import { IsUUID, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateSlotDto {
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
  clientId: string;

  @IsUUID()
  @IsNotEmpty()
  nutritionistId: string;
}
