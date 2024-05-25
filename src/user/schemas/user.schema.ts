import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Role } from "src/type/role";
export type UserDocument = User & Document;
@Schema({
    timestamps : true
})

export class User extends Document{

    @Prop()
    name : string;

    @Prop({unique:[true,'Duplicate email entered']})
    email : string;

    @Prop()
    password : string;

    @Prop({ enum: ['admin', 'user']})
    role : Role;

   
}

export const UserSchema =
 SchemaFactory.createForClass(User);