// reserved-slot.subscriber.ts
import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { ReservedSlot } from './reserved-slot.entity';
import { Client } from 'src/user/client/client.entity';

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

  // After a ReservedSlot is deleted
  async afterRemove(event: RemoveEvent<ReservedSlot>) {
    const reservedSlot = event.entity;
    if (reservedSlot?.client) {
      await event.manager.decrement(
        Client,
        { id: reservedSlot.client.id },
        'reservedSlotsCount',
        1,
      );
    }
  }
}
