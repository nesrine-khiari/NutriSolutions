import { ClientModel } from './client.model';
import { NutritionistModel } from './nutritionist.model';

export class SlotModel {
  constructor(
    public date: Date,
    public day: string,
    public time: string,
    public client: ClientModel | string,
    public nutritionist: NutritionistModel | string,
    public id?: string
  ) {}
}
