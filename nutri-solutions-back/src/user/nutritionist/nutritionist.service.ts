import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { UserService } from '../user.service';
import { Nutritionist } from './nutritionist.entity';
import { CreateNutritionistDto } from './dtos/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';
import { UserEntity } from '../user.entity';

@Injectable()
export class NutritionistService extends UserService {
  constructor(
    @InjectRepository(Nutritionist)
    protected readonly nutritionistRepository: Repository<Nutritionist>,
  ) {
    super(nutritionistRepository);
  }
  async findAll(): Promise<Nutritionist[]> {
    return this.nutritionistRepository.find();
  }

  async findOne(id: string): Promise<Nutritionist> {
    const user = await this.nutritionistRepository.findOneBy({ id } as any);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  // Create a new client
  // async create(
  //   createNutritionistDto: CreateNutritionistDto,
  // ): Promise<Nutritionist> {
  //   const newNutritionist = this.nutritionistRepository.create(
  //     createNutritionistDto,
  //   );
  //   return this.nutritionistRepository.save(newNutritionist);
  // }

  // Update an existing client
  // async update(
  //   id: string,
  //   updateNutritionistDto: UpdateNutritionistDto,
  // ): Promise<Nutritionist> {
  //   const nutritionist = await this.nutritionistRepository.findOne({
  //     where: { id },
  //   }); // Ensure client exists
  //   Object.assign(nutritionist, updateNutritionistDto); // Merge updates
  //   return this.nutritionistRepository.save(nutritionist);
  // }
}
