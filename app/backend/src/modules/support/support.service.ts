import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ID } from '../../infrastructure/global';
import { UsersService } from '../users/users.service';
import { GetChatListParams } from './dto/get-requests.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Message } from './schemas/message.schema';
import { Support } from './schemas/support.schema';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class SupportService {
  constructor(
    @InjectModel(Support.name) private supportModel: Model<Support>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    private usersService: UsersService,
    private socketService: SocketService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findSupportRequests(params: GetChatListParams): Promise<Support[]> {
    return this.supportModel
      .find(params)
      .populate('userId', ['email', 'name', 'contactPhone'])
      .select('-__v');
  }

  async sendMessage(sendMessageDto: SendMessageDto): Promise<Message> {
    const { supportRequestId, authorId, text } = sendMessageDto;
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

    const isValidUserId = mongoose.isValidObjectId(authorId);
    if (!isValidUserId) {
      throw new BadRequestException('Некорректный ID пользователя!');
    }

    const user = await this.usersService.findById(authorId);
    if (!user) {
      throw new NotFoundException('Пользователь с данным ID не найден!');
    }

    if (
      supportRequest.userId.toString() !==
        new mongoose.Types.ObjectId(authorId.toString()).toString() &&
      user.role !== 'admin' &&
      user.role !== 'manager'
    ) {
      throw new ForbiddenException(
        'Вы не можете оставлять сообщения в этом обращении!',
      );
    }

    try {
      const message = new this.messageModel({
        authorId,
        text,
        sentAt: new Date(),
      });
      await message.save();

      supportRequest.messages.push(message);
      await supportRequest.save();

      this.eventEmitter.emit('newMessage', { supportRequest, message });
      this.socketService.server
        .to(String(supportRequestId))
        .emit('subscribeToChat', { supportRequestId, message });

      return message;
    } catch (error) {
      console.log('[ERROR]: SupportService.sendMessage error:');
      console.error(error);
    }
  }

  async getMessages(supportRequestId: ID, userId: ID): Promise<Message[]> {
    const isValidSupportId = mongoose.isValidObjectId(supportRequestId);
    if (!isValidSupportId) {
      throw new BadRequestException('Некорректный ID обращения!');
    }

    const supportRequest = await this.supportModel.findById(supportRequestId);
    if (!supportRequest) {
      throw new NotFoundException('Обращение с данным ID не найдено!');
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
      supportRequest.userId.toString() !==
        new mongoose.Types.ObjectId(userId.toString()).toString() &&
      user.role !== 'admin' &&
      user.role !== 'manager'
    ) {
      throw new ForbiddenException(
        'Вы не можете просматривать историю сообщений этого обращения!',
      );
    }

    return supportRequest.messages || [];
  }

  subscribe(
    handler: (supportRequest: Support, message: Message) => void,
  ): () => void {
    this.eventEmitter.on('newMessage', ({ supportRequest, message }) => {
      handler(supportRequest, message);
    });
    return;
  }
}
