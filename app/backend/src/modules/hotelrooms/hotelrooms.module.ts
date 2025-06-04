import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelroomsController } from './hotelrooms.controller';
import { HotelroomsService } from './hotelrooms.service';
import { HotelRooms, HotelRoomsSchema } from './schema/hotelrooms.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HotelRooms.name, schema: HotelRoomsSchema },
    ]),
  ],
  controllers: [HotelroomsController],
  providers: [HotelroomsService],
  exports: [HotelroomsService],
})
export class HotelroomsModule {}
