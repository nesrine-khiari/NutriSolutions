import { IsArray } from 'class-validator';

export class UpdateReservedSlotDto {
  @IsArray()
  notes: string[];
}
