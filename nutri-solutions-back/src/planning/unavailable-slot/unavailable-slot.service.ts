import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientService } from 'src/user/client/client.service';
import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';
import { UnavailableSlot } from './unavailable-slot.entity';
import { CreateUnavailableSlotDto } from './dtos/create-unavailable-slot.dto';
import { ReservedSlot } from '../reserved-slot/reserved-slot.entity';
import { EmailService } from 'src/common/email/email.service';
import { CreateReservedSlotDto } from '../dtos/create-slot.dto';

@Injectable()
export class UnavailableSlotService {
  constructor(
    @InjectRepository(UnavailableSlot)
    protected readonly unavailableSlotRepository: Repository<UnavailableSlot>,
    @InjectRepository(ReservedSlot)
    protected readonly reservedSlotRepository: Repository<ReservedSlot>,
    protected readonly clientService: ClientService,
    protected readonly emailService: EmailService,
    protected readonly nutritionistService: NutritionistService,
  ) {}

  /**
   * Create a new reserved slot.
   * @param createSlotDto The data for the new slot.
   * @returns The created reserved slot.
   */
  async createSlot(
    createUnavailableSlotDto: CreateUnavailableSlotDto,
  ): Promise<UnavailableSlot> {
    const nutritionistId = createUnavailableSlotDto.nutritionistId;
    const nutritionist = await this.nutritionistService.findOne(nutritionistId);
    if (!nutritionist) {
      throw new NotFoundException(
        `Nutritionist with ID ${nutritionistId} not found`,
      );
    }
    if (createUnavailableSlotDto.isReservation) {
      const { date, day, time, clientId, isReservation } =
        createUnavailableSlotDto as CreateReservedSlotDto;
      // Find client and nutritionist by their IDs
      const client = await this.clientService.findOne(clientId);
      if (!client) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
      }

      // Create and save the reserved slot
      const reservedSlot = this.reservedSlotRepository.create({
        date,
        day,
        time,
        client,
        nutritionist,
        isReservation,
      });
      const slot = await this.reservedSlotRepository.save(reservedSlot);
      const reservationDate = `${new Date(slot.date).toLocaleDateString()} at ${slot.time}`;
      await this.emailService.sendReservationNotification(
        slot.nutritionist.email,
        slot.nutritionist.name,
        slot.client.name,
        reservationDate,
      );
      return slot;
    } else {
      const { date, day, time, isReservation } =
        createUnavailableSlotDto as CreateUnavailableSlotDto;
      const unavailableSlot = this.unavailableSlotRepository.create({
        date,
        day,
        time,
        nutritionist,
        isReservation,
      });
      return this.unavailableSlotRepository.save(unavailableSlot);
    }
  }

  /**
   * Retrieve all reserved slots with related client and nutritionist information.
   * @returns A list of all reserved slots.
   */
  async findAllByNutritionist(id: string): Promise<UnavailableSlot[]> {
    const nutritionist = await this.nutritionistService.findOne(id);
    const unavailableSlots = nutritionist.unavailableSlots;
    return unavailableSlots;
  }
  /**
   * Retrieve a reserved slot by its ID.
   * @param id The ID of the reserved slot.
   * @returns The reserved slot if found, or null if not.
   */
  async findOne(id: string): Promise<UnavailableSlot> {
    const slot = await this.unavailableSlotRepository.findOne({
      where: { id },
      relations: ['nutritionist'],
    });

    if (!slot) {
      throw new NotFoundException(`Unavailable slot with ID ${id} not found`);
    }

    // Check if the slot is a reserved slot and add the 'client' relation
    if (slot.isReservation) {
      const reservedSlot = await this.reservedSlotRepository.findOne({
        where: { id },
        relations: ['nutritionist', 'client'],
      });
      if (!reservedSlot) {
        throw new NotFoundException(`Reserved slot with ID ${id} not found`);
      }
      return reservedSlot;
    }

    return slot;
  }
  /**
   * Delete a reserved slot by its ID.
   * @param id The ID of the reserved slot to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.unavailableSlotRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reserved slot with ID ${id} not found`);
    }
    return true;
  }
}
