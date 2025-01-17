import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UserService {
    protected readonly userRepository: Repository<UserEntity>;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    findOneByEmail(email: string): Promise<UserEntity>;
    create(createDto: CreateUserDto): Promise<UserEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    validateUser(email: string, password: string): Promise<UserEntity | null>;
    remove(id: string): Promise<void>;
}
