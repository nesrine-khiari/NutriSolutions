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

  async findAll(): Promise<RecipeEntity[]> {
    return this.recipeRepository.find();
  }

  async findOne(id: string): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
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
