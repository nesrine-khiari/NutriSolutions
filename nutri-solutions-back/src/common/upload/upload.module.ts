import { Module } from '@nestjs/common';
import { FileUploadController } from './upload.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
})
export class UploadModule {}
