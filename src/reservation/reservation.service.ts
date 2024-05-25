import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRservationeDto } from './dto/createReservation.dto';
import { User } from 'src/user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './schema/reservationschema';
import mongoose from 'mongoose';

@Injectable()
export class ReservationService {
    constructor (
        @InjectModel(Reservation.name)
        private reservationModel: mongoose.Model<Reservation>
    ) {
      
    }

async createReservation (reservation : CreateRservationeDto, user: User): Promise<Reservation>{
    try{
    //const formattedStartDate = reservation.startDate.toISOString().slice(0, 10); // Format YYYY-MM-DD
    //const formattedEndtDate = reservation.endDate.toISOString().slice(0, 10); // Format YYYY-MM-DD
    //console.log(formattedStartDate, formattedEndtDate)
    const conflicts = await this.checkForConflicts(reservation.annonceId, reservation.startDate, reservation.endDate);
    if (conflicts.length > 0) {
      throw new HttpException('Conflicting reservation dates. Please choose different dates.',HttpStatus.CONFLICT);
      
    }
    const data = Object.assign(reservation, { userId: user._id });
    const NewReservation = await this.reservationModel.create(data);
    return NewReservation;
}catch(err){
    console.log(err)
}
}

   // Méthode pour verifier les dates de reservations 

private async checkForConflicts(annonceId: string,startDate: Date,endDate: Date): Promise<Reservation[]> {
    return await this.reservationModel.find({
      annonceId,
      $or: [
        { startDate: { $lt: endDate, $gte: startDate } },
        { endDate: { $gt: startDate, $lte: endDate } },
      ],
    });
  }


   // Méthode pour trouver les jours bloqués à partir des réservations
   async findBlockedDays(): Promise<Date[]> {
    const reservations = await this.reservationModel.find({ blocked: true }).exec();
    const blockedDays: Date[] = [];

    reservations.forEach((reservation) => {
      const startDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);

      // Ajouter tous les jours entre startDate et endDate (inclus)
      for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
        blockedDays.push(new Date(date));
      }
    });

    return blockedDays;
  }

  // Méthode pour trouver toutes les dates bloquées à partir des réservations
  async findBlockedDatesSansDoublons(): Promise<Date[]> {
    const reservations = await this.reservationModel.find({ blocked: true }).exec();
    const blockedDatesSet = new Set<string>();

    reservations.forEach((reservation) => {
      const startDate = new Date(reservation.startDate);
      const endDate = new Date(reservation.endDate);

      // Ajouter toutes les dates entre startDate et endDate (inclus)
      for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        blockedDatesSet.add(date.toISOString().split('T')[0]); // Ajoute la date en format ISO (sans heure) au set
      }
    });

    // Convertir le set en tableau de dates
    const blockedDates = Array.from(blockedDatesSet).map(dateString => new Date(dateString));

    return blockedDates;
  }





async deleteReservation (id : string): Promise<Reservation>{
    return await this.reservationModel.findByIdAndDelete(id);

}

async getReservationById (id : string): Promise<Reservation>{
        const Reservation = await this.reservationModel.findById(id);
        return Reservation;

    }

async getUserReservations (user : User): Promise<Reservation[]>{
        const Reservation = await this.reservationModel.find({userId: user._id});
        return Reservation;

    }

async countUserReservations (user : User): Promise<number>{
        const Reservation = await this.reservationModel.find({userId: user._id});
        return Reservation.length;

    }

async countAllReservations (): Promise<number>{
        return await this.reservationModel.countDocuments();
        
    }

}
