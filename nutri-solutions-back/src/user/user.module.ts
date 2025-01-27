import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Client } from './client/client.entity';
import { Nutritionist } from './nutritionist/nutritionist.entity';
import { ClientService } from './client/client.service';
import { NutritionistService } from './nutritionist/nutritionist.service';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { NutritionistController } from './nutritionist/nutritionist.controller';
import { ClientController } from './client/client.controller';
import { ReservedSlot } from 'src/planning/reserved-slot.entity';
import { ReservedSlotService } from 'src/planning/reserved-slot/reserved-slot.service';
import { Admin } from './admin/admin.entity';
import { EmailService } from 'src/common/email/email.service';

@Module({
  controllers: [NutritionistController, ClientController],
  providers: [
    UserService,
    ClientService,
    NutritionistService,
    ReservedSlotService,
    EmailService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      Client,
      Nutritionist,
      RecipeEntity,
      Admin,
      ReservedSlot,
    ]),
  ],
  exports: [UserService, ClientService, NutritionistService],
})
export class UserModule {}
