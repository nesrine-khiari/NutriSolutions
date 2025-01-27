// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateSlotDto } from '../dtos/create-slot.dto';
// import { ClientService } from 'src/user/client/client.service';
// import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';
// import { UpdateSlotDto } from '../dtos/update-slot.dto';
// import { UnavailableSlot } from './unavailable-slot.entity';
// import { CreateUnavailableSlotDto } from './dtos/create-unavailable-slot.dto';
// import { ReservedSlot } from '../reserved-slot.entity';

// @Injectable()
// export class UnavailableSlotService {
//   constructor(
//     @InjectRepository(UnavailableSlot)
//     protected readonly unavailableSlotRepository: Repository<UnavailableSlot>,
//     @InjectRepository(ReservedSlot)
//     protected readonly reservedSlotRepository: Repository<ReservedSlot>,
//     protected readonly clientService: ClientService,
//     protected readonly nutritionistService: NutritionistService,
//   ) {}

//   /**
//    * Create a new reserved slot.
//    * @param createSlotDto The data for the new slot.
//    * @returns The created reserved slot.
//    */
//   async createSlot(
//     createUnavailableSlotDto: CreateUnavailableSlotDto,
//   ): Promise<UnavailableSlot> {
//     const nutritionistId = createUnavailableSlotDto.nutritionistId;
//     const nutritionist = await this.nutritionistService.findOne(nutritionistId);
//     if (!nutritionist) {
//       throw new NotFoundException(
//         `Nutritionist with ID ${nutritionistId} not found`,
//       );
//     }
//     if (createUnavailableSlotDto.isReserved) {
//       const { date, day, time, clientId, isReserved } =
//         createUnavailableSlotDto as CreateSlotDto;
//       // Find client and nutritionist by their IDs
//       const client = await this.clientService.findOne(clientId);
//       if (!client) {
//         throw new NotFoundException(`Client with ID ${clientId} not found`);
//       }

//       // Create and save the reserved slot
//       const reservedSlot = this.reservedSlotRepository.create({
//         date,
//         day,
//         time,
//         client,
//         nutritionist,
//         isReserved,
//       });

//       return this.reservedSlotRepository.save(reservedSlot);
//     } else {
//       const { date, day, time, isReserved } =
//         createUnavailableSlotDto as CreateUnavailableSlotDto;
//       const unavailableSlot = this.unavailableSlotRepository.create({
//         date,
//         day,
//         time,
//         nutritionist,
//         isReserved,
//       });
//       return this.unavailableSlotRepository.save(unavailableSlot);
//     }
//   }

//   /**
//    * Retrieve all reserved slots with related client and nutritionist information.
//    * @returns A list of all reserved slots.
//    */
//   async findAllByNutritionist(id: string): Promise<UnavailableSlot[]> {
//     const nutritionist = await this.nutritionistService.findOne(id);
//     const reservedSlots = nutritionist.reservedSlots;
//     return reservedSlots;
//   }

//   /**
//    * Retrieve a reserved slot by its ID.
//    * @param id The ID of the reserved slot.
//    * @returns The reserved slot if found, or null if not.
//    */
//   async findOne(id: string): Promise<ReservedSlot> {
//     const slot = await this.reservedSlotRepository.findOne({
//       where: { id },
//       relations: ['client', 'nutritionist'],
//     });

//     if (!slot) {
//       throw new NotFoundException(`Reserved slot with ID ${id} not found`);
//     }

//     return slot;
//   }

//   /**
//    * Delete a reserved slot by its ID.
//    * @param id The ID of the reserved slot to delete.
//    * @returns True if deletion was successful, false otherwise.
//    */
//   async delete(id: string): Promise<boolean> {
//     const result = await this.reservedSlotRepository.delete(id);

//     if (result.affected === 0) {
//       throw new NotFoundException(`Reserved slot with ID ${id} not found`);
//     }

//     return true;
//   }
//   async update(
//     id: string,
//     updateSlotDto: UpdateSlotDto,
//   ): Promise<ReservedSlot> {
//     const slot = await this.findOne(id);
//     Object.assign(slot, updateSlotDto);
//     return this.reservedSlotRepository.save(slot);
//   }

//   async getAppointments(
//     clientId: string,
//     nutritionistId: string,
//     appointmentsNumber: number,
//   ): Promise<ReservedSlot> {
//     const query = this.reservedSlotRepository
//       .createQueryBuilder('reservedSlot')
//       .leftJoinAndSelect('reservedSlot.client', 'client')
//       .where('reservedSlot.nutritionistId = :nutritionistId', {
//         nutritionistId,
//       })
//       .andWhere('reservedSlot.clientId = :clientId', { clientId })
//       .orderBy('reservedSlot.date', 'ASC');

//     if (appointmentsNumber > 1) {
//       query.skip(appointmentsNumber - 1);
//     }

//     return await query.take(1).getOne();
//   }
// }
