import {
  Controller,
  Post,
  Param,
  Body,
  ParseUUIDPipe,
  Get,
  Patch,
} from '@nestjs/common';
import { ClientEntity } from './client.entity';
import { UserController } from '../user.controller';
import { ClientService } from './client.service';
import { CreateClientDto } from './dtos/create-client.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserEntity } from '../user.entity';
import { UpdateClientDto } from './dtos/update-client.dto';

@Controller('clients')
export class ClientController extends UserController {
  constructor(protected readonly clientService: ClientService) {
    super(clientService); // Call the parent constructor
  }

  @Post()
  async create(
    @Body() createClientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    return this.clientService.create(createClientDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<UserEntity> {
    return this.clientService.update(id, updateClientDto);
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
}
