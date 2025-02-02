// reserved-slot.subscriber.ts
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { ReservedSlot } from './reserved-slot.entity';
import { Client } from 'src/user/client/client.entity';
import { UnavailableSlot } from '../unavailable-slot/unavailable-slot.entity';
import { Nutritionist } from 'src/user/nutritionist/nutritionist.entity';
import { ReservedSlotService } from './reserved-slot.service';
import { Inject, Logger } from '@nestjs/common';
import { log } from 'console';

@EventSubscriber()
export class ReservedSlotSubscriber
  implements EntitySubscriberInterface<ReservedSlot>
{
  listenTo() {
    return ReservedSlot; // Listen to ReservedSlot entity events
  }

  // After a ReservedSlot is inserted
  async afterInsert(event: InsertEvent<ReservedSlot>) {
    const reservedSlot = event.entity;
    if (reservedSlot.client) {
      await event.manager.increment(
        Client,
        { id: reservedSlot.client.id },
        'reservedSlotsCount',
        1,
      );
    }
  }

  async afterRemove(event: RemoveEvent<UnavailableSlot>) {
    // this.logger.debug('dkhalna remove');

    const reservedSlot = event.entity;
    if ((reservedSlot as ReservedSlot)?.client) {
      await event.manager.decrement(
        Client,
        { id: (reservedSlot as ReservedSlot)?.client.id },
        'reservedSlotsCount',
        1,
      );
    }
    // ✅ Check if this was the last appointment for the client with this nutritionist
    const remainingAppointments = await event.manager.count(ReservedSlot, {
      where: {
        client: { id: (reservedSlot as ReservedSlot).client.id },
        nutritionist: { id: reservedSlot.nutritionist.id },
      },
    });

    if (remainingAppointments === 0) {
      // Last appointment removed → Decrease patientsCount of Nutritionist
      await event.manager.decrement(
        Nutritionist,
        { id: reservedSlot.nutritionist.id },
        'patientsNumber',
        1,
      );
    }
  }
  // async calculateNutritionistRating(
  //   nutritionistId: string,
  //   numOfStars: number,
  // ): Promise<number> {
  //   const nutritionist = await this.findOne(nutritionistId);
  //   const clientsCount = await this.getClientsCount(nutritionistId);
  //   const totalStars =
  //     nutritionist.stars * nutritionist.patientsNumber + numOfStars;
  //   return totalStars / clientsCount;
  // }

  async afterUpdate(event: UpdateEvent<ReservedSlot>) {
    Logger.warn('afterUpdateNutritionistRating');
    const reservedSlot = event.entity;
    const nutritionist = reservedSlot.nutritionist;
    const slotsCount = await event.manager.count(ReservedSlot, {
      where: { nutritionist: { id: reservedSlot.nutritionist.id } },
    });
    Logger.warn('staars: ' + reservedSlot.rating);
    let totalStars: number =
      nutritionist.rating * (slotsCount - 1) + Number(reservedSlot.rating);
    Logger.warn('totalStars: ' + totalStars);
    nutritionist.rating = totalStars / slotsCount;
    Logger.warn('nutritionistRating: ' + nutritionist.rating);
    await event.manager.save(nutritionist);
  }
}
