import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { PlanningModule } from './planning/planning.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadController } from './common/upload/upload.controller';
import { UploadModule } from './common/upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RecipeModule,
    UserModule,
    PlanningModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    UploadModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, FileUploadController],
  providers: [AppService],
})
export class AppModule {}
