import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservedSlot } from './reserved-slot/reserved-slot.entity';
import { ReservedSlotService } from './reserved-slot/reserved-slot.service';
import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';
import { ClientService } from 'src/user/client/client.service';
import { Client } from 'src/user/client/client.entity';
import { Nutritionist } from 'src/user/nutritionist/nutritionist.entity';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { UserEntity } from 'src/user/user.entity';
import { EmailService } from 'src/common/email/email.service';
import { UnavailableSlot } from './unavailable-slot/unavailable-slot.entity';
import { UnavailableSlotService } from './unavailable-slot/unavailable-slot.service';
import { UnavailableSlotController } from './unavailable-slot/unavailable-slot.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservedSlot,
      Client,
      Nutritionist,
      RecipeEntity,
      UserEntity,
      UnavailableSlot,
    ]),
  ],
  providers: [
    ReservedSlotService,
    ClientService,
    NutritionistService,
    EmailService,
    UnavailableSlotService,
  ],
  controllers: [UnavailableSlotController],
})
export class PlanningModule {}
