import { NutritionistService } from './nutritionist.service';
import { Nutritionist } from './nutritionist.entity';
export declare class NutritionistController {
    protected readonly nutritionistService: NutritionistService;
    constructor(nutritionistService: NutritionistService);
    findAll(): Promise<Nutritionist[]>;
}
