import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelroomsModule } from '../hotelrooms/hotelrooms.module';
import { HotelsModule } from '../hotels/hotels.module';
import { UsersModule } from '../users/users.module';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { Reservations, ReservationsSchema } from './schema/reservations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Reservations.name, schema: ReservationsSchema },
    ]),
    UsersModule,
    HotelsModule,
    HotelroomsModule,
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
