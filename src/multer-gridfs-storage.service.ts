import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import * as Grid from 'gridfs-stream';
import * as mongoose from 'mongoose';

Grid.mongo = mongoose.mongo;

@Injectable()
export class MulterGridfsStorageService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridfsStorage(),
    };
  }

  private gridfsStorage(): any {
    return Grid({
      db: mongoose.connection.db,
      file: (req, file) => ({
        filename: file.originalname,
        bucketName: 'uploads', // Specify your bucket name
      }),
    });
  }
}