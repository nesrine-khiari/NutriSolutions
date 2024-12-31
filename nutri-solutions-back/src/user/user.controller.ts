// import { UserService } from './user.service';
// import { UserEntity } from './user.entity';
// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { CreateUserDto } from './dtos/create-user.dto';
// import { UpdateUserDto } from './dtos/update-user.dto';
// import { ClientEntity } from './client/client.entity';
// import { CreateClientDto } from './client/dtos/create-client.dto';
// import { ClientService } from './client/client.service';

// @Controller('users')
// export class UserController {
//   constructor(
//     private readonly userService: UserService<>,
//   ) {}

//   @Get()
//   async findAll(): Promise<UserEntity[]> {
//     return this.userService.findAll();
//   }
//   @Post()
//   async create(
//     @Body() createClientDto: CreateClientDto,
//   ): Promise<ClientEntity> {
//     return this.clientService.create(createClientDto);
//   }
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<UserEntity> {
//     return this.userService.findOne(id);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string): Promise<void> {
//     return this.userService.remove(id);
//   }
// }
