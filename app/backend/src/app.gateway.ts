import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketService } from './modules/socket/socket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private socketService: SocketService) {}

  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.socketService.server = server;

    this.server.of('/').adapter.on('join-room', (room, id) => {
      this.logger.log(`socket ${id} has joined room ${room}`);
    });

    this.server.of('/').adapter.on('leave-room', (room, id) => {
      this.logger.log(`socket ${id} has leaved room ${room}`);
    });
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
