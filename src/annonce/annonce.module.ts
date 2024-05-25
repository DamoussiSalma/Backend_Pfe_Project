import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceController } from './annonce.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnonceSchema } from './schema/annonceShema';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports : [ 
    AuthModule,
    MongooseModule.forFeature([{name: 'Annonce', schema: AnnonceSchema}]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Set destination folder
        filename: (req, file, cb) => {
          const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + '-' + Date.now() + path.parse(file.originalname).ext;
          cb(null, filename);
        }
      }),
    }),
  
  ],


  providers: [AnnonceService],
  controllers: [AnnonceController]
})
export class AnnonceModule {}
