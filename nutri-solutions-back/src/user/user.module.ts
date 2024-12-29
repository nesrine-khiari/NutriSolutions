import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { ClientEntity } from './client/client.entity';
import { NutritionistEntity } from './nutritionist/nutritionist.entity';
import { AdminEntity } from './admin/admin.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      ClientEntity,
      NutritionistEntity,
      AdminEntity,
    ]),
  ],
})
export class UserModule {}
