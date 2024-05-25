import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { AnnonceModule } from './annonce/annonce.module';
import { AdminModule } from './admin/admin.module';
import { ReservationModule } from './reservation/reservation.module';
import { NotificationModule } from './notification/notification.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentaireModule } from './commentaire/commentaire.module';
import { AvisModule } from './avis/avis.module';
import { CalenderModule } from './calender/calender.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal:true ,
    }),

    MongooseModule.forRoot(process.env.DB_URI),
    UserModule,
    AuthModule,
    AnnonceModule,
    AdminModule,
    ReservationModule,
    NotificationModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',}),
    CommentaireModule,
    AvisModule,
    CalenderModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
