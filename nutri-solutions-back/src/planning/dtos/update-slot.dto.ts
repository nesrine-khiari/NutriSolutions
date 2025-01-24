import { IsArray } from 'class-validator';

export class UpdateSlotDto {
  @IsArray()
  notes: string[];
}
