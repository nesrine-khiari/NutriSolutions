import {
  Controller,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  Get,
  Patch,
  Delete,
  Query,
  Req,
  LoggerService,
} from '@nestjs/common';
import { NutritionistService } from './nutritionist.service';
import { Nutritionist } from './nutritionist.entity';
import { Roles } from 'src/auth/guards/role.guard';
import { UserRoleEnum } from 'src/enums/user-enums';
import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';
import { Public } from 'src/auth/guards/auth.guard';

@Controller('nutritionists')
export class NutritionistController {
  constructor(protected readonly nutritionistService: NutritionistService, ) {}
  @Roles(UserRoleEnum.ADMIN, UserRoleEnum.CLIENT)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() request: Request,  // Inject the request to get the user's role
  ): Promise<{
    data: Nutritionist[];
    total: number;
  }> {
    const userRole = request['user'].role;  // Get the user's role

    if (userRole === UserRoleEnum.ADMIN) {
      return this.nutritionistService.findAllNutritionists(page, limit);
    } else {
      return this.nutritionistService.findAllApprovedNutritionists(page, limit);
    }
  }
  @Public()
  @Get('count')
  async countNutritionists(): Promise<{ total: number }> {
    return this.nutritionistService.countNutritionists();
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


