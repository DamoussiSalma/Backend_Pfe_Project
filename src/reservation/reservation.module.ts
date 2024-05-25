import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationSchema } from './schema/reservationschema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [
    AuthModule,
    MongooseModule.forFeature([{name: 'Reservation', schema: ReservationSchema}])],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
