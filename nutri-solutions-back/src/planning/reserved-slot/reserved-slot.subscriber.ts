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
import { Nutritionist } from 'src/user/nutritionist/nutritionist.entity';
import { Logger } from '@nestjs/common';
import { UnavailableSlot } from '../unavailable-slot/unavailable-slot.entity';

@EventSubscriber()
export class ReservedSlotSubscriber
  implements EntitySubscriberInterface<ReservedSlot>
{
  listenTo() {
    return ReservedSlot; // Listen to ReservedSlot entity events
  }

  private readonly logger = new Logger(ReservedSlotSubscriber.name);

  async beforeSoftRemove(event: RemoveEvent<ReservedSlot>) {
    this.logger.debug('dkhalna after soft remove');

    let reservedSlot = event.databaseEntity;

    // If databaseEntity is undefined, manually load it
    if (!reservedSlot) {
      reservedSlot = await event.manager.findOne(ReservedSlot, {
        where: { id: event.entity?.id },
        relations: ['client', 'nutritionist'], // Ensure relations are loaded
      });

      if (!reservedSlot) {
        this.logger.warn('ReservedSlot entity could not be found!');
        return;
      }
    }
    this.logger.debug(reservedSlot);
    if (reservedSlot?.client) {
      await event.manager.decrement(
        Client,
        { id: reservedSlot.client.id },
        'reservedSlotsCount',
        1,
      );
    }
    // ✅ Check if this was the last appointment for the client with this nutritionist
    const remainingAppointments = await event.manager.count(ReservedSlot, {
      where: {
        client: { id: reservedSlot.client.id },
        nutritionist: { id: reservedSlot.nutritionist.id },
      },
    });
    this.logger.debug('remaining appointments: ' + remainingAppointments);

    if (remainingAppointments === 1) {
      // Last appointment removed → Decrease patientsCount of Nutritionist
      await event.manager.decrement(
        Nutritionist,
        { id: reservedSlot.nutritionist.id },
        'patientsNumber',
        1,
      );
    }
  }

  // After a ReservedSlot is inserted
  async afterInsert(event: InsertEvent<ReservedSlot>) {
    const reservedSlot = event.entity;

    if (reservedSlot.client && reservedSlot.nutritionist) {
      const { client, nutritionist } = reservedSlot;

      // ✅ Check if this is the first appointment for the client with this nutritionist
      const existingAppointments = await event.manager.count(ReservedSlot, {
        where: {
          client: { id: client.id },
          nutritionist: { id: nutritionist.id },
        },
      });
      this.logger.debug(existingAppointments);

      if (existingAppointments === 1) {
        // First appointment → Increase patientsCount of Nutritionist
        await event.manager.increment(
          Nutritionist,
          { id: nutritionist.id },
          'patientsNumber',
          1,
        );
      }

      await event.manager.increment(
        Client,
        { id: reservedSlot.client.id },
        'reservedSlotsCount',
        1,
      );
    }
  }
}
