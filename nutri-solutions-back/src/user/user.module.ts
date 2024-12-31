import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Client } from './client/client.entity';
import { Nutritionist } from './nutritionist/nutritionist.entity';
import { AdminEntity } from './admin/admin.entity';
import { ClientService } from './client/client.service';
import { NutritionistService } from './nutritionist/nutritionist.service';
import { RecipeEntity } from 'src/recipe/recipe-entity';

@Module({
  controllers: [],
  providers: [UserService, ClientService, NutritionistService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      Client,
      Nutritionist,
      RecipeEntity,
      AdminEntity,
    ]),
  ],
  exports: [UserService, ClientService, NutritionistService],
})
export class UserModule {}
