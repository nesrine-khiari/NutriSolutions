import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservedSlot } from './reserved-slot.entity';
import { ReservedSlotService } from './reserved-slot/reserved-slot.service';
import { ReservedSlotController } from './reserved-slot/reserved-slot.controller';
import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';
import { ClientService } from 'src/user/client/client.service';
import { Client } from 'src/user/client/client.entity';
import { Nutritionist } from 'src/user/nutritionist/nutritionist.entity';
import { RecipeEntity } from 'src/recipe/recipe-entity';
import { UserEntity } from 'src/user/user.entity';
import { EmailService } from 'src/common/email/email.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReservedSlot,
      Client,
      Nutritionist,
      RecipeEntity,
      UserEntity,
    ]),
  ],
  providers: [ReservedSlotService, ClientService, NutritionistService,EmailService],
  controllers: [ReservedSlotController],
})
export class PlanningModule {}
