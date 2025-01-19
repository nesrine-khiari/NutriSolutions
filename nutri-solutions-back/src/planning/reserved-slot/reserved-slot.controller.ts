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


@Controller('reserved-slots')
export class ReservedSlotController {
  constructor(private readonly reservedSlotService: ReservedSlotService) {}

  /**
   * Create a new reserved slot
   * @param createSlotDto The data for the slot to create
   * @returns The created reserved slot
   */
  @Post()
  async create(@Body() createSlotDto: CreateSlotDto): Promise<ReservedSlot> {
    return this.reservedSlotService.createSlot(createSlotDto);
  }

  /**
   * Get all reserved slots
   * @returns A list of all reserved slots
   */
  @Get()
  async findAll(): Promise<ReservedSlot[]> {
    return this.reservedSlotService.findAll();
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
