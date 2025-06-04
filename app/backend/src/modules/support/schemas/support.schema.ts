import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { ID } from '../../../infrastructure/global';
import { MessageDocument } from './message.schema';

export type SupportDocument = HydratedDocument<Support>;

@Schema({
  timestamps: true,
})
export class Support extends Document {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: ID;

  @Prop({ required: false, default: [] })
  // messages: [{ type: mongoose.Schema.Types.ObjectId; ref: 'Message' }];
  messages: MessageDocument[];

  @Prop({ required: false, default: true })
  isActive: boolean;
}

export const SupportSchema = SchemaFactory.createForClass(Support);
