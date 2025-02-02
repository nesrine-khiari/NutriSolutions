import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipe.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { UpdateRecipeDto } from './dtos/update-recipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';
import { Public } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/guards/role.guard';
import { UserRoleEnum } from 'src/enums/user-enums';
import { RecipeEntity } from './recipe-entity';
import { CategoryEnum, ObjectifEnum } from 'src/enums/recipe-enums';
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
    @Query('searchText') searchText?: string,
    @Query('objectif') objectif?: ObjectifEnum,
    @Query('categorie') category?: CategoryEnum,
  ): Promise<{ data: RecipeEntity[]; total: number }> {
    return this.recipesService.findAll(
      Number(page),
      Number(limit),
      searchText,
      objectif as ObjectifEnum, // Ensure it's treated as an enum
      category as CategoryEnum, // Ensure it's treated as an enum
    );
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
