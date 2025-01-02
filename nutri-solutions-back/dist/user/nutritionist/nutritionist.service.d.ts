import { Repository } from 'typeorm';
import { UserService } from '../user.service';
import { UserEntity } from '../user.entity';
export declare class NutritionistService extends UserService {
    protected readonly userRepository: Repository<UserEntity>;
    constructor(userRepository: Repository<UserEntity>);
}
