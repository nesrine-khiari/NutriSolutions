import { ClientModel } from './client.model';
import { NutritionistModel } from './nutritionist.model';

export class SlotModel {
  constructor(
    public date: Date,
    public day: string,
    public time: string,
    public clientId: string,
    public nutritionistId: string,
    public id?: string
  ) {}
}
