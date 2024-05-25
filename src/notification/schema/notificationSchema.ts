import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type NotificationDocument = Document & Notification;

@Schema()
export class Notification {
    
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
    
  @Prop()
  content: string;

  @Prop({ default: false })
  isRead: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;


}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

