import {
  Controller,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  Get,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../user.entity';
import { UpdateClientDto } from './dtos/update-client.dto';
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
  //   @Post()
  //   async create(
  //     @Body() createClientDto: CreateClientDto,
  //   ): Promise<Client> {
  //     return this.clientService.create(createClientDto);
  //   }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOneById(id);
  }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string): Promise<void> {
  //     return this.clientService.remove(id);
  //   }
  //   @Patch(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body() updateClientDto: UpdateClientDto,
  //   ): Promise<Client> {
  //     return this.clientService.update(id, updateClientDto);
  //   }

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
  @Get(':id/last-reserved-slot')
  async getLastReservedSlot(
    @Param('id') id: string,
  ): Promise<ReservedSlot | null> {
    return this.clientService.getLastReservedSlot(id);
  }
}
