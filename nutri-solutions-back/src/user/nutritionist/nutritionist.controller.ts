// import {
//   Controller,
//   Post,
//   Param,
//   Body,
//   ParseUUIDPipe,
//   Get,
//   Patch,
// } from '@nestjs/common';
// import { UserController } from '../user.controller';
// import { UpdateUserDto } from '../dtos/update-user.dto';
// import { UserEntity } from '../user.entity';
// import { NutritionistService } from './nutritionist.service';
// import { CreateNutritionistDto } from './dtos/create-nutritionist.dto';
// import { NutritionistEntity } from './nutritionist.entity';
// import { UpdateNutritionistDto } from './dtos/update-nutritionist.dto';

// @Controller('nutritionists')
// export class NutritionistController extends UserController {
//   constructor(protected readonly nutritionistService: NutritionistService) {
//     super(nutritionistService); // Call the parent constructor
//   }

//   @Post()
//   async create(
//     @Body() createNutritionistDto: CreateNutritionistDto,
//   ): Promise<NutritionistEntity> {
//     return this.nutritionistService.create(createNutritionistDto);
//   }

//   @Patch(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateNutritionistDto: UpdateNutritionistDto,
//   ): Promise<UserEntity> {
//     return this.nutritionistService.update(id, updateNutritionistDto);
//   }
// }
