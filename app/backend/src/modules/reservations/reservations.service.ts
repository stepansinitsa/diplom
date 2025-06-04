import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/global';
import { HotelroomsService } from '../hotelrooms/hotelrooms.service';
import { HotelsService } from '../hotels/hotels.service';
import { UsersService } from '../users/users.service';
import { ReservationDto } from './dto/reservation.dto';
import { Reservations } from './schema/reservations.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservations.name)
    private reservationsModel: Model<Reservations>,
    private usersService: UsersService,
    private hotelsService: HotelsService,
    private hotelRoomsService: HotelroomsService,
  ) {}

  async addReservation(reservationDto: ReservationDto): Promise<Reservations> {
    const isValidUserId = mongoose.isValidObjectId(reservationDto.userId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя!');
    }

    const user = await this.usersService.findById(reservationDto.userId);
    if (!user) {
      throw new NotFoundException('Пользователь с данным ID не найден!');
    }

    const isValidHotelId = mongoose.isValidObjectId(reservationDto.hotelId);
    if (!isValidHotelId) {
      throw new BadRequestException('Некорректный ID отеля!');
    }

    const hotel = await this.hotelsService.findById(reservationDto.hotelId);
    if (!hotel) {
      throw new NotFoundException('Отель с данным ID не найден!');
    }

    const isValidRoomId = mongoose.isValidObjectId(reservationDto.roomId);
    if (!isValidRoomId) {
      throw new BadRequestException('Некорректный ID комнаты!');
    }

    const room = await this.hotelRoomsService.findById(reservationDto.roomId);
    if (!room) {
      throw new NotFoundException('Комната с данным ID не найдена!');
    }

    if (room.isEnabled === false) {
      throw new BadRequestException(
        'Бронировать этот номер временно недоступно!',
      );
    }

    try {
      const createdReservation = new this.reservationsModel(reservationDto);
      return createdReservation.save();
    } catch (error) {
      console.log('[ERROR]: ReservationsService.addReservation error:');
      console.error(error);
    }
  }

  async removeReservation(
    reservationId: ID,
    userId: ID,
  ): Promise<Reservations> {
    const isValidReservationId = mongoose.isValidObjectId(reservationId);
    if (!isValidReservationId) {
      throw new BadRequestException('Некорректный ID бронирования!');
    }

    const reservation = await this.reservationsModel.findById(reservationId);
    if (!reservation) {
      throw new NotFoundException('Бронь с таким ID не найдена!');
    }

    const isValidUserId = mongoose.isValidObjectId(userId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя!');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь с данным ID не найден!');
    }

    if (
      reservation.userId.toString() !==
        new mongoose.Types.ObjectId(userId.toString()).toString() &&
      user.role !== 'admin' &&
      user.role !== 'manager'
    ) {
      throw new ForbiddenException('Вы не можете удалить это бронирование!');
    }

    return this.reservationsModel.findByIdAndDelete(reservationId);
  }

  async searchReservations(
    searchParams: Partial<ReservationDto>,
  ): Promise<Reservations[]> {
    const { userId } = searchParams;

    const isValidUserId = mongoose.isValidObjectId(userId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя!');
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь с данным ID не найден!');
    }

    return this.reservationsModel
      .find({ userId })
      .populate('userId', ['email'])
      .populate('hotelId', ['title'])
      .populate('roomId', ['title'])
      .select('-__v');
  }
}
