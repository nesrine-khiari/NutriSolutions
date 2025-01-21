import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReservedSlotService } from './reserved-slot.service';
import { CreateSlotDto } from '../dtos/create-slot.dto';
import { ReservedSlot } from '../reserved-slot.entity';
import { EmailService } from 'src/common/email/email.service';

@Controller('planning')
export class ReservedSlotController {
  constructor(
    private readonly reservedSlotService: ReservedSlotService,
    private emailService: EmailService,
  ) {}

  /**
   * Create a new reserved slot
   * @param createSlotDto The data for the slot to create
   * @returns The created reserved slot
   */
  @Post()
  async create(@Body() createSlotDto: CreateSlotDto): Promise<ReservedSlot> {
    const slot = await this.reservedSlotService.createSlot(createSlotDto);
    const date= new Date(slot.date);
    const reservationDate = date.toLocaleDateString() + ' at ' + slot.time;
    await this.emailService.sendReservationNotification(
      slot.nutritionist.email,
      slot.nutritionist.name,
      slot.client.name,
      reservationDate,
    );
    return slot;
  }

  /**
   * Get all reserved slots
   * @returns A list of all reserved slots
   */
  @Get(':nutritionistId')
  async findAll(
    @Param('nutritionistId') nutritionistId: string,
  ): Promise<ReservedSlot[]> {
    return this.reservedSlotService.findAllByNutritionist(nutritionistId);
  }

  /**
   * Get a reserved slot by its ID
   * @param id The ID of the reserved slot
   * @returns The reserved slot with the given ID
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReservedSlot> {
    const slot = await this.reservedSlotService.findOne(id);
    if (!slot) {
      throw new NotFoundException(`Reserved slot with ID ${id} not found`);
    }
    return slot;
  }

  /**
   * Delete a reserved slot by its ID
   * @param id The ID of the reserved slot to delete
   * @returns A success response
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    const result = await this.reservedSlotService.delete(id);
    if (!result) {
      throw new NotFoundException(`Reserved slot with ID ${id} not found`);
    }
  }
}
