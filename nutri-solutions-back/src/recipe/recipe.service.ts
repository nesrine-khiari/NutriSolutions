import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { RecipeEntity } from './recipe-entity';
import { CategoryEnum, ObjectifEnum } from 'src/enums/recipe-enums';

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
    searchText?: string,
    objectif?: ObjectifEnum, // Assuming this is an enum
    categorie?: CategoryEnum, // Assuming this is an enum
  ): Promise<{
    data: RecipeEntity[];
    total: number;
  }> {
    const queryBuilder = this.recipeRepository.createQueryBuilder('recipe');

    if (searchText?.trim()) {
      const formattedSearch = `%${searchText.trim()}%`;
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(recipe.name) LIKE LOWER(:searchText)', {
            searchText: formattedSearch,
          }).orWhere('LOWER(recipe.description) LIKE LOWER(:searchText)', {
            searchText: formattedSearch,
          });
        }),
      );
    }

    if (objectif) {
      queryBuilder.andWhere('recipe.objectif = :objectif', { objectif });
    }

    if (categorie) {
      queryBuilder.andWhere('recipe.category = :categorie', { categorie });
    }

    queryBuilder.skip((page - 1) * limit).take(limit);

    // Get results and total count
    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total };
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
