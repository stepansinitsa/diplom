import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/global';
import { UsersService } from '../users/users.service';
import { CreateSupportRequestDto } from './dto/create-support.dto';
import { MarkMessagesAsReadDto } from './dto/mark-message.dto';
import { Message } from './schemas/message.schema';
import { Support } from './schemas/support.schema';

@Injectable()
export class SupportClientService {
  constructor(
    @InjectModel(Support.name) private supportModel: Model<Support>,
    private usersService: UsersService,
  ) {}

  async createSupportRequest(
    createSupportDto: CreateSupportRequestDto,
  ): Promise<Support> {
    const isValidUserId = mongoose.isValidObjectId(createSupportDto.userId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя!');
    }

    const user = await this.usersService.findById(createSupportDto.userId);
    if (!user) {
      throw new NotFoundException('Пользователь с данным ID не найден!');
    }

    try {
      const createdSupportRequest = new this.supportModel({
        userId: createSupportDto.userId,
      });
      return createdSupportRequest.save();
    } catch (error) {
      console.log('[ERROR]: SupportClientService.createSupportRequest error:');
      console.error(error);
    }
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    const isValidSupportId = mongoose.isValidObjectId(params.supportRequestId);
    if (!isValidSupportId) {
      throw new BadRequestException('Некорректный ID обращения!');
    }

    const supportRequest = await this.supportModel
      .findById(params.supportRequestId)
      .select('-__v')
      .exec();
    if (!supportRequest) {
      throw new NotFoundException('Обращение с данным ID не найдено!');
    }

    try {
      supportRequest.messages
        .filter((message) => message.authorId != params.userId)
        .filter((message) => message.sentAt <= params.createdBefore)
        .forEach((message) => {
          message.readAt = new Date();
          message.save();
        });
    } catch (error) {
      console.log('[ERROR]: SupportClientService.markMessagesAsRead error:');
      console.error(error);
    }
  }

  async getUnreadCount(supportRequestId: ID): Promise<Message[]> {
    const isValidSupportId = mongoose.isValidObjectId(supportRequestId);
    if (!isValidSupportId) {
      throw new BadRequestException('Некорректный ID обращения!');
    }

    const supportRequest = await this.supportModel
      .findById(supportRequestId)
      .select('-__v')
      .exec();
    if (!supportRequest) {
      throw new NotFoundException('Обращение с данным ID не найдено!');
    }

    return supportRequest.messages.filter((message) => !message.readAt) || [];
  }
}
