import { NutritionistService } from './nutritionist.service';
import { Nutritionist } from './nutritionist.entity';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';
export declare class NutritionistController {
    protected readonly nutritionistService: NutritionistService;
    constructor(nutritionistService: NutritionistService);
    findAll(): Promise<Nutritionist[]>;
    update(id: string, updateNutritionistDto: UpdateNutritionistDto): Promise<Nutritionist>;
}
