import {
  Controller,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  Get,
  Patch,
  Delete,
} from '@nestjs/common';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { NutritionistService } from './nutritionist.service';
import { CreateNutritionistDto } from './dtos/create-nutritionist.dto';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';
import { Nutritionist } from './nutritionist.entity';

@Controller('nutritionists')
export class NutritionistController {
  constructor(protected readonly nutritionistService: NutritionistService) {}
  @Get()
  async findAll(): Promise<Nutritionist[]> {
    return this.nutritionistService.findAll();
  }

  //   @Get(':id')
  //   async findOne(@Param('id') id: string): Promise<Nutritionist> {
  //     return this.nutritionistService.findOne(id);
  //   }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string): Promise<void> {
  //     return this.nutritionistService.remove(id);
  //   }

  //   @Patch(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body() updateNutritionistDto: UpdateNutritionistDto,
  //   ): Promise<Nutritionist> {
  //     return this.nutritionistService.update(id, updateNutritionistDto);
  //   }
}
