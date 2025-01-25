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
import { NutritionistController } from './nutritionist/nutritionist.controller';
import { ClientController } from './client/client.controller';
import { ReservedSlot } from 'src/planning/reserved-slot.entity';
import { ReservedSlotService } from 'src/planning/reserved-slot/reserved-slot.service';

@Module({
  controllers: [NutritionistController, ClientController],
  providers: [
    UserService,
    ClientService,
    NutritionistService,
    ReservedSlotService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      Client,
      Nutritionist,
      RecipeEntity,
      AdminEntity,
      ReservedSlot,
    ]),
  ],
  exports: [UserService, ClientService, NutritionistService],
})
export class UserModule {}
