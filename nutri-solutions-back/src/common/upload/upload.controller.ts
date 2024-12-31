import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Public } from 'src/auth/guards/auth.guard';
import { v4 as uuidv4 } from 'uuid';

const createFileInterceptorOptions = (
  destination: string,
  allowedExtensions: string[],
) => ({
  storage: diskStorage({
    destination: `./uploads/${destination}`,
    filename: (req, file, callback) => {
      const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
      callback(null, uniqueName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (
      !allowedExtensions.includes(extname(file.originalname).toLowerCase())
    ) {
      return callback(
        new Error(`Only ${allowedExtensions.join(', ')} files are allowed!`),
        false,
      );
    }
    callback(null, true);
  },
});
@Public()
@Controller('upload')
export class FileUploadController {
  @Post('/image')
  @UseInterceptors(
    FileInterceptor(
      'file',
      createFileInterceptorOptions('images', ['.jpg', '.jpeg', '.png', '.gif']),
    ),
  )
  uploadImage(@UploadedFile() image: Express.Multer.File) {
    return {
      message: 'Image uploaded successfully!',
      filename: image.filename,
      path: `/uploads/images/${image.filename}`,
    };
  }

  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', createFileInterceptorOptions('files', ['.pdf'])),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
      path: `/uploads/files/${file.filename}`,
    };
  }
}
function isPublic(): (target: typeof FileUploadController) => void | typeof FileUploadController {
  throw new Error('Function not implemented.');
}

