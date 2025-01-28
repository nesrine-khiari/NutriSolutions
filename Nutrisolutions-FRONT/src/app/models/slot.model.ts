import { ClientModel } from './client.model';
import { NutritionistModel } from './nutritionist.model';

export class SlotModel {
  constructor(
    public date: Date,
    public day: string,
    public time: string,
    public nutritionist: NutritionistModel,
    public isReservation: boolean,
    public isReserved: boolean,
    public client?: ClientModel,
    public notes?: string[],
    public id?: string
  ) {}
}

export interface CreateSlotModelDto {
  date: Date;
  day: string;
  time: string;
  isReservation: boolean;
  clientId?: string;
  nutritionistId: string;
  // NutritionistModel |
  id?: string;
}
