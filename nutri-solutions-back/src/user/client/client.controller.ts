// import {
//   Controller,
//   Post,
//   Param,
//   Body,
//   ParseUUIDPipe,
//   Get,
//   Patch,
//   Delete,
// } from '@nestjs/common';
// import { Client } from './client.entity';
// import { ClientService } from './client.service';
// import { CreateClientDto } from './dtos/create-client.dto';
// import { UpdateUserDto } from '../dtos/update-user.dto';
// import { UserEntity } from '../user.entity';
// import { UpdateClientDto } from './dtos/update-client.dto';
// import { Public } from 'src/auth/guards/auth.guard';
// @Public()
// @Controller('clients')
// export class ClientController {
//   constructor(protected readonly clientService: ClientService) {}
//   @Get()
//   async findAll(): Promise<Client[]> {
//     return this.clientService.findAll();
//   }
//   @Post()
//   async create(
//     @Body() createClientDto: CreateClientDto,
//   ): Promise<Client> {
//     return this.clientService.create(createClientDto);
//   }
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<UserEntity> {
//     return this.clientService.findOne(id);
//   }

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

//   @Post(':clientId/favorites')
//   async addFavorite(
//     @Param('clientId') clientId: string,
//     @Body('recipeId') recipeId: string,
//   ) {
//     return this.clientService.addFavoriteRecipe(clientId, recipeId);
//   }
//   @Get(':clientId/favorites')
//   async getFavourites(@Param('clientId') clientId: string) {
//     return this.clientService.getFavouriteRecipes(clientId);
//   }
// }
