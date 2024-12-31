// import {
//   Controller,
//   Post,
//   Param,
//   Body,
//   ParseUUIDPipe,
//   Get,
//   Patch,
//   Delete,
// } from '@nestjs/common';
// import { UpdateUserDto } from '../dtos/update-user.dto';
// import { UserEntity } from '../user.entity';
// import { NutritionistService } from './nutritionist.service';
// import { CreateNutritionistDto } from './dtos/create-nutritionist.dto';
// import { Nutritionist } from './nutritionist.entity';
// import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';

// @Controller('nutritionists')
// export class NutritionistController {
//   constructor(protected readonly nutritionistService: NutritionistService) {}
//   @Get()
//   async findAll(): Promise<Nutritionist[]> {
//     return this.nutritionistService.findAll();
//   }
//   @Post()
//   async create(
//     @Body() createClientDto: CreateNutritionistDto,
//   ): Promise<Nutritionist> {
//     return this.nutritionistService.create(createClientDto);
//   }
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<UserEntity> {
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
//   ): Promise<UserEntity> {
//     return this.nutritionistService.update(id, updateNutritionistDto);
//   }
// }
