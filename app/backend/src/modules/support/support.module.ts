import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Message, MessageSchema } from './schemas/message.schema';
import { Support, SupportSchema } from './schemas/support.schema';
import { SupportClientService } from './support.client.service';
import { SupportController } from './support.controller';
import { SupportEmployeeService } from './support.employee.service';
import { SupportGateway } from './support.gateway';
import { SupportService } from './support.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Support.name, schema: SupportSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
    UsersModule,
  ],
  controllers: [SupportController],
  providers: [
    SupportService,
    SupportClientService,
    SupportEmployeeService,
    SupportGateway,
  ],
})
export class SupportModule {}
