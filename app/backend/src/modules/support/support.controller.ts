import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guard/auth.guard';
import { RolesGuard } from '../../guard/roles.guard';
import { ID } from '../../infrastructure/global';
import { CreateSupportRequestDto } from './dto/create-support.dto';
import { GetChatListParams } from './dto/get-requests.dto';
import { MarkMessagesAsReadDto } from './dto/mark-message.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { Message } from './schemas/message.schema';
import { Support } from './schemas/support.schema';
import { SupportClientService } from './support.client.service';
import { SupportEmployeeService } from './support.employee.service';
import { SupportService } from './support.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/support')
export class SupportController {
  constructor(
    private supportService: SupportService,
    private supportClientService: SupportClientService,
    private supportEmployeeService: SupportEmployeeService,
  ) {}

  @Roles('client')
  @Post()
  async createSupportRequest(@Body() body: CreateSupportRequestDto) {
    const newRequest =
      await this.supportClientService.createSupportRequest(body);

    await this.supportService.sendMessage({
      authorId: body.userId,
      supportRequestId: newRequest._id.toString(),
      text: body.text,
    });

    const unReadCount = await this.supportClientService.getUnreadCount(
      newRequest._id.toString(),
    );

    return {
      id: newRequest._id,
      createdAt: newRequest['createdAt'],
      isActive: newRequest.isActive,
      hasNewMessages: unReadCount.length > 0,
    };
  }  @Roles('client', 'manager', 'admin')
  @Get()
  findSupportRequests(@Query() params: GetChatListParams): Promise<Support[]> {
    return this.supportService.findSupportRequests(params);
  }

  @Roles('client', 'manager', 'admin')
  @Post('/sendmessage')
  sendMessage(@Body() sendMessageDto: SendMessageDto): Promise<Message> {
    return this.supportService.sendMessage(sendMessageDto);
  }

  @Roles('client', 'manager', 'admin')
  @Get('/getmessages/:id')
  getMessages(
    @Param('id') supportRequestId: ID,
    @Query() data: { userId: ID },
  ): Promise<Message[]> {
    return this.supportService.getMessages(supportRequestId, data.userId);
  }

  @Roles('client', 'manager', 'admin')
  @Post('/readmessages')
  markMessagesAsRead(
    @Body() markMessagesAsReadDto: MarkMessagesAsReadDto,
    @Request() request: any,
  ) {
    if (request.user?.role === 'client') {
      this.supportClientService.markMessagesAsRead(markMessagesAsReadDto);
    } else if (
      request.user?.role === 'manager' ||
      request.user?.role === 'admin'
    ) {
      this.supportEmployeeService.markMessagesAsRead(markMessagesAsReadDto);
    }
  }

  @Roles('manager', 'admin')
  @Post('/closerequest/:id')
  async closeRequest(@Param('id') supportRequestId: ID) {
    await this.supportEmployeeService.closeRequest(supportRequestId);
  }
}
