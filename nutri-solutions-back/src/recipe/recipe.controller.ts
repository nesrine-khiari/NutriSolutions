import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipe.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { Roles } from 'src/auth/guards/role.guard';
import { UserRoleEnum } from 'src/enums/user-enums';
import { RecipeEntity } from './recipe-entity';
import { Public } from 'src/auth/guards/auth.guard';
@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipesService: RecipesService) {}
  @Roles(UserRoleEnum.NUTRITIONIST)
  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipesService.create(createRecipeDto);
  }

  @Get()
  async getRecipes(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    data: RecipeEntity[];
    total: number;
  }> {
    return this.recipesService.findAll(Number(page), Number(limit));
  }
  @Public()
  @Get('count')
  async countNutritionists(): Promise<{ total: number }> {
    return this.recipesService.countRecipes();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }
  @Roles(UserRoleEnum.NUTRITIONIST)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.recipesService.update(id, updateRecipeDto);
  }
  @Roles(UserRoleEnum.NUTRITIONIST)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }
}
