import { BadRequestException, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import * as nuid from 'nuid';
import * as path from 'path'
import { dirExists } from './utils';

const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 配置文件上传后的文件夹路径
        destination: async (req, file, cb) => {
          // 根据上传的文件类型将图片视频音频和其他类型文件分别存到对应英文文件夹
          const mimeType = file.mimetype.split('/')[1];
          let temp = 'other';
          image.filter(item => item === mimeType).length > 0
            ? (temp = 'image')
            : '';
          video.filter(item => item === mimeType).length > 0
            ? (temp = 'video')
            : '';
          audio.filter(item => item === mimeType).length > 0
            ? (temp = 'audio')
            : '';
          const thePath = `static/uploads/${temp}/${dayjs().format(
            'YYYY-MM-DD',
          )}`
          const filePath = path.resolve(__dirname, `../../../`, thePath)
          file['url'] = `${process.env.BASE_URL}/${thePath}`
          await dirExists(filePath); // 判断文件夹是否存在，不存在则自动生成
          return cb(null, filePath);
        },
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          const fileType = file.originalname.split('.');
          const filename = `${nuid.next()}.${fileType[fileType.length - 1]}`;
          file['url'] = `${ file['url']}/${filename}`
          return cb(null, filename);
        },
      }), 
      fileFilter(req, file, cb) {
        const mimeType = file.mimetype.split('/')[1].toLowerCase();
        let temp = 'other';
        image.filter(item => item === mimeType).length > 0
          ? (temp = 'image')
          : '';
        video.filter(item => item === mimeType).length > 0
          ? (temp = 'video')
          : '';
        audio.filter(item => item === mimeType).length > 0
          ? (temp = 'audio')
          : '';
        if (temp === 'other') {
          return cb(new BadRequestException('文件格式错误！'), false);
        }
        return cb(null, true);
      },
    })
  ],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
