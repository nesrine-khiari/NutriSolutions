import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservedSlot } from './reserved-slot.entity';
import { ClientService } from 'src/user/client/client.service';
import { NutritionistService } from 'src/user/nutritionist/nutritionist.service';
import { UpdateReservedSlotDto } from '../dtos/update-slot.dto';

@Injectable()
export class ReservedSlotService {
  constructor(
    @InjectRepository(ReservedSlot)
    protected readonly reservedSlotRepository: Repository<ReservedSlot>,
    private readonly clientService: ClientService,
    private readonly nutritionistService: NutritionistService,
  ) {}

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

  async update(
    id: string,
    updateSlotDto: UpdateReservedSlotDto,
  ): Promise<ReservedSlot> {
    const slot = await this.findOne(id);
    Object.assign(slot, updateSlotDto);
    return this.reservedSlotRepository.save(slot);
  }

  async getAppointments(
    clientId: string,
    nutritionistId: string,
    appointmentsNumber: number,
  ): Promise<ReservedSlot> {
    const query = this.reservedSlotRepository
      .createQueryBuilder('reservedSlot')
      .leftJoinAndSelect('reservedSlot.client', 'client')
      .where('reservedSlot.nutritionistId = :nutritionistId', {
        nutritionistId,
      })
      .andWhere('reservedSlot.clientId = :clientId', { clientId })
      .orderBy('reservedSlot.date', 'ASC');

    if (appointmentsNumber > 1) {
      query.skip(appointmentsNumber - 1);
    }

    return await query.take(1).getOne();
  }

}
