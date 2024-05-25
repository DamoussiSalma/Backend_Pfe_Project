import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Annonce } from 'src/annonce/schema/annonceShema';
import { User } from 'src/user/schemas/user.schema';

export type CalenderDocument = Document & Calender;

@Schema()
export class Calender {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    ownerId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    AnnonceId: Annonce;

    @Prop ({ type: [Date]})
    blockedDate : Date[] ;
    

}

export const CalenderSchema = SchemaFactory.createForClass(Calender);