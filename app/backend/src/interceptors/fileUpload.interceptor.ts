import { NestInterceptor, Type } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

export function MulterFilesInterceptor(): Type<NestInterceptor> {
  return FilesInterceptor('images', 10, {
    storage: diskStorage({
      destination: path.join(__dirname, '..', '..', '..', '/public/hotels'),
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype.includes('jpg') ||
        file.mimetype.includes('jpeg') ||
        file.mimetype.includes('png') ||
        file.mimetype.includes('webp')
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });
}
