import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class UpdateReservedSlotDto {
  // @IsOptional()
  @IsArray()
  notes: string[];

  // @IsOptional()
  @IsNumber()
  rating: number;
}
