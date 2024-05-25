import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Annonce } from 'src/annonce/schema/annonceShema';

export enum Status {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    CANCELLED = 'cancelled',
  }
@Schema({ timestamps : true})

export class Reservation extends Document {


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    hostId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Annonce' })
    annonceId: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;
    

    @Prop()
    totalPrice : number ;

    @Prop({ default: Status.PENDING }) // 'pending', 'accepted', 'cancelled'
    status: Status;

    @Prop({ default: false}) // 'true', 'false'
    isPaid: boolean;

  
    @Prop({ default: true}) // 'true', 'false'
    blocked: boolean;
}

export const ReservationSchema = 
SchemaFactory.createForClass(Reservation);