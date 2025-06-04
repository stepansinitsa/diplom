import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type HotelRoomDocument = HydratedDocument<HotelRooms>;

@Schema({
  timestamps: true,
})
export class HotelRooms {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotels', required: true })
  hotel: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ required: true })
  isEnabled: boolean;
}

export const HotelRoomsSchema = SchemaFactory.createForClass(HotelRooms);
