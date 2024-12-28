import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { PlanningModule } from './planning/planning.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadController } from './common/upload/upload.controller';
import { UploadModule } from './common/upload/upload.module';

@Module({
  imports: [
    RecipeModule,
    UserModule,
    PlanningModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nutrisolutions',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UploadModule,
  ],
  controllers: [AppController, FileUploadController],
  providers: [AppService],
})
export class AppModule {}
