import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HotelsDocument = HydratedDocument<Hotels>;

@Schema({
  timestamps: true,
})
export class Hotels {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];
}

export const HotelsSchema = SchemaFactory.createForClass(Hotels);
