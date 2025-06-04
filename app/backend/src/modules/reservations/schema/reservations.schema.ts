import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ID } from '../../../infrastructure/global';

export type ReservationsDocument = HydratedDocument<Reservations>;

@Schema({
  timestamps: true,
})
export class Reservations {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Users' })
  userId: ID;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Hotels' })
  hotelId: ID;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HotelRooms',
  })
  roomId: ID;

  @Prop({ required: true })
  dateStart: Date;

  @Prop({ required: true })
  dateEnd: Date;
}

export const ReservationsSchema = SchemaFactory.createForClass(Reservations);
