import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservedSlot } from '../reserved-slot.entity';
import { CreateSlotDto } from '../dtos/create-slot.dto';
import { ClientService } from 'src/user/client/client.service';
import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';

@Injectable()
export class ReservedSlotService {
  constructor(
    @InjectRepository(ReservedSlot)
    protected readonly reservedSlotRepository: Repository<ReservedSlot>,
    private readonly clientService: ClientService,
    private readonly nutritionistService: NutritionistService,
  ) {}

  /**
   * Create a new reserved slot.
   * @param createSlotDto The data for the new slot.
   * @returns The created reserved slot.
   */
  async createSlot(createSlotDto: CreateSlotDto): Promise<ReservedSlot> {
    const { date, day, time, clientId, nutritionistId } = createSlotDto;

    // Find client and nutritionist by their IDs
    const client = await this.clientService.findOne(clientId);
    if (!client) {
      throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    const nutritionist = await this.nutritionistService.findOne(nutritionistId);
    if (!nutritionist) {
      throw new NotFoundException(
        `Nutritionist with ID ${nutritionistId} not found`,
      );
    }

    // Create and save the reserved slot
    const reservedSlot = this.reservedSlotRepository.create({
      date,
      day,
      time,
      client,
      nutritionist,
    });

    return this.reservedSlotRepository.save(reservedSlot);
  }

  /**
   * Retrieve all reserved slots with related client and nutritionist information.
   * @returns A list of all reserved slots.
   */
  async findAllByNutritionist(id: string): Promise<ReservedSlot[]> {
    const nutritionist = await this.nutritionistService.findOne(id);
    const reservedSlots = nutritionist.reservedSlots;
    return reservedSlots;
  }

  /**
   * Retrieve a reserved slot by its ID.
   * @param id The ID of the reserved slot.
   * @returns The reserved slot if found, or null if not.
   */
  async findOne(id: string): Promise<ReservedSlot> {
    const slot = await this.reservedSlotRepository.findOne({
      where: { id },
      relations: ['client', 'nutritionist'],
    });

    if (!slot) {
      throw new NotFoundException(`Reserved slot with ID ${id} not found`);
    }

    return slot;
  }

  /**
   * Delete a reserved slot by its ID.
   * @param id The ID of the reserved slot to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  async delete(id: string): Promise<boolean> {
    const result = await this.reservedSlotRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reserved slot with ID ${id} not found`);
    }

    return true;
  }
}
