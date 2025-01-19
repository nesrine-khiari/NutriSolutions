import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from 'src/auth/guards/auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';

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
    if (!allowedExtensions.includes(extname(file.originalname).toLowerCase())) {
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
  @Get('/:filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    // Make sure to construct the file path with 'uploads/files/'
    const filePath = join(__dirname,'..', '..', '..', 'uploads', 'files', filename);

    // Validate the filename
    if (!filename) {
      throw new HttpException('Filename is required', HttpStatus.BAD_REQUEST);
    }

    // Check if the file exists before trying to send it
    try {
      res.sendFile(filePath);  // Send the file from the correct directory
    } catch (error) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  }}
function isPublic(): (
  target: typeof FileUploadController,
) => void | typeof FileUploadController {
  throw new Error('Function not implemented.');
}
