import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { Nutritionist } from './nutritionist.entity';
export declare class NutritionistService extends UserService {
    protected readonly nutritionistRepository: Repository<Nutritionist>;
    constructor(nutritionistRepository: Repository<Nutritionist>);
    findAll(): Promise<Nutritionist[]>;
    findOne(id: string): Promise<Nutritionist>;
}
