import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from 'src/infrastructure/global';
import { MarkMessagesAsReadDto } from './dto/mark-message.dto';
import { Message } from './schemas/message.schema';
import { Support } from './schemas/support.schema';

@Injectable()
export class SupportEmployeeService {
  constructor(
    @InjectModel(Support.name) private supportModel: Model<Support>,
  ) {}

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
      console.log('[ERROR]: SupportEmployeeService.markMessagesAsRead error:');
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

  async closeRequest(supportRequestId: ID): Promise<void> {
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

    try {
      supportRequest.isActive = false;
      await supportRequest.save();
    } catch (error) {
      console.log('[ERROR]: SupportEmployeeService.closeRequest error:');
      console.error(error);
    }
  }
}
