import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { UserService } from '../user.service';
import { NutritionistEntity } from './nutritionist.entity';
import { CreateNutritionistDto } from './dtos/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';

@Injectable()
export class NutritionistService extends UserService {
  constructor(
    @InjectRepository(NutritionistEntity)
    private readonly nutritionistRepository: Repository<NutritionistEntity>,
  ) {
    super(nutritionistRepository);
  }

  // Create a new client
  async create(
    createNutritionistDto: CreateNutritionistDto,
  ): Promise<NutritionistEntity> {
    const newNutritionist = this.nutritionistRepository.create(
      createNutritionistDto,
    );
    return this.nutritionistRepository.save(newNutritionist);
  }

  // Update an existing client
  async update(
    id: string,
    updateNutritionistDto: UpdateNutritionistDto,
  ): Promise<NutritionistEntity> {
    const nutritionist = await this.nutritionistRepository.findOne({
      where: { id },
    }); // Ensure client exists
    Object.assign(nutritionist, updateNutritionistDto); // Merge updates
    return this.nutritionistRepository.save(nutritionist);
  }
}
