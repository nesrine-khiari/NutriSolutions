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
import { NutritionistService } from './nutritionist.service';
import { Nutritionist } from './nutritionist.entity';
import { Roles } from 'src/auth/guards/role.guard';
import { UserRoleEnum } from 'src/enums/user-enums';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';

@Controller('nutritionists')
export class NutritionistController {
  constructor(protected readonly nutritionistService: NutritionistService) {}
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Get()
  async findAll(): Promise<Nutritionist[]> {
    return this.nutritionistService.findAll();
  }
  @Get('top')
  async getBestNutritionists(): Promise<Nutritionist[]> {
    return this.nutritionistService.getBestNutritionists();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Nutritionist> {
    return this.nutritionistService.findOne(id);
  }
  @Get(':id/patients')
  async getPatientsByNutritionist(@Param('id') id: string) {
    return this.nutritionistService.getPatientsByNutritionist(id);
  }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string): Promise<void> {
  //     return this.nutritionistService.remove(id);
  //   }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNutritionistDto: UpdateNutritionistDto,
  ): Promise<Nutritionist> {
    return this.nutritionistService.update(id, updateNutritionistDto);
  }
}
