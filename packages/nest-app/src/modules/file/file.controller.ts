import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public } from '../admin/login/decorators';

@Controller('/api/file')
export class FileController {
  @Public()
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File & { url: string }) {
    return `${process.env.FILE_BASE_URL}${file.url}`;
  }

  @Public()
  @Post('/uploadFiles')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return files;
  }
}
