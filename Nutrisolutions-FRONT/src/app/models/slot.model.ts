import { ClientModel } from './client.model';
import { NutritionistModel } from './nutritionist.model';

export class SlotModel {
  constructor(
    public date: Date,
    public day: string,
    public time: string,
    public client: ClientModel,
    public nutritionist: NutritionistModel,
    public id?: string
  ) {}
}
export interface CreateSlotModelDto {
  date: Date;
  day: string;
  time: string;
  clientId: string;
  nutritionistId: string;
}
