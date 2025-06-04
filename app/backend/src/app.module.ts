import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app.gateway';
import { AuthModule } from './modules/auth/auth.module';
import { HotelroomsModule } from './modules/hotelrooms/hotelrooms.module';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { SocketModule } from './modules/socket/socket.module';
import { SupportModule } from './modules/support/support.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    EventEmitterModule.forRoot({
      wildcard: true,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 100,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),
    UsersModule,
    AuthModule,
    HotelsModule,
    HotelroomsModule,
    ReservationsModule,
    SupportModule,
    SocketModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
