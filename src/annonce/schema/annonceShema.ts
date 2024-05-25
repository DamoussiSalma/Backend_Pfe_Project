import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';


@Schema({
  timestamps : true
})
export class Annonce extends Document {

    @Prop()
    categorie:string;

    @Prop()
    type: string;

    @Prop()
    adresse:string;

    @Prop()
    ville:string;

    @Prop()
    nbGuest: number;

    @Prop()
    nbChambre: number;

    @Prop()
    nbBed: number;

    @Prop()
    nbBath: number;

    @Prop()
    titre:string;

    @Prop()
    description:string;

    
    @Prop({ type: [String] })
    ameneties: string[];


    @Prop({ type: [String] })
    images: string[];   // Array of image URLs or file paths

    @Prop()
    price : number ;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: string;

    @Prop({ default: 'pending' }) // 'pending', 'accepted', 'cancelled'
    status: string;
}

export const AnnonceSchema = SchemaFactory.createForClass(Annonce);
