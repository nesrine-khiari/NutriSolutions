import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { RecipeEntity } from './recipe-entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepository: Repository<RecipeEntity>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
    const recipe = this.recipeRepository.create(createRecipeDto);
    return await this.recipeRepository.save(recipe);
  }

  async findAll(
    page: number = 1,
    limit: number = 12,
  ): Promise<{
    data: RecipeEntity[];
    total: number;
  }> {
    const [data, total] = await this.recipeRepository.findAndCount({
      skip: (page - 1) * limit, // Offset calculation
      take: limit, // Number of items per page
    });

    return {
      data,
      total,
    };
  }
  async countRecipes(): Promise<{ total: number }> {
    const total = await this.recipeRepository.count();
    return { total };
  }
  async findOne(id: string): Promise<RecipeEntity> {
    // Include related favorite recipes
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['favoritedByClient'],
    });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeEntity> {
    const recipe = await this.findOne(id);
    Object.assign(recipe, updateRecipeDto);
    return this.recipeRepository.save(recipe);
  }

  async remove(id: string): Promise<void> {
    const recipe = await this.findOne(id);
    await this.recipeRepository.remove(recipe);
  }
}
