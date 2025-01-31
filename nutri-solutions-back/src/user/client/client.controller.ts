import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { Public } from 'src/auth/guards/auth.guard';
import { ReservedSlotService } from 'src/planning/reserved-slot/reserved-slot.service';
import { ReservedSlot } from 'src/planning/reserved-slot/reserved-slot.entity';
@Public()
@Controller('clients')
export class ClientController {
  constructor(
    protected readonly clientService: ClientService,
    protected readonly reservedSlotService: ReservedSlotService,
  ) {}
  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }
  @Get('count')
  async countNutritionists(): Promise<{ total: number }> {
    return this.clientService.countClients();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOneById(id);
  }

  @Post(':clientId/favorites')
  async addFavorite(
    @Param('clientId') clientId: string,
    @Body('recipeId') recipeId: string,
  ) {
    return this.clientService.addFavoriteRecipe(clientId, recipeId);
  }
  @Get(':clientId/favorites')
  async getFavourites(@Param('clientId') clientId: string) {
    return this.clientService.getFavouriteRecipes(clientId);
  }

  @Get(':clientId/appointments/:nutritionistId')
  async getAppointements(
    @Param('clientId') clientId: string,
    @Param('nutritionistId') nutritionistId: string,
    @Query('appointmentNumber') appointmentNumber: number,
  ) {
    return this.reservedSlotService.getAppointments(
      clientId,
      nutritionistId,
      appointmentNumber,
    );
  }
  
}
