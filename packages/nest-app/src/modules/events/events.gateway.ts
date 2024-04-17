import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { jwtConstants } from '../admin/login/constants';
import { EventsService } from './events.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwt: JwtService,
    private eventsService: EventsService,
  ) {}

  handleDisconnect(client: Socket) {
    console.log(`client ${client.id} 下线了`);
  }

  async handleConnection(client: Socket) {
    const query = client.handshake.query;
    try {
      const payload = await this.jwt.verifyAsync(query.token as string, {
        secret: jwtConstants.secret,
      });

      const userId = payload.userId;
      const adminUserId = payload.adminUserId;
      if (userId) {
        this.eventsService.handleClientSocketConnection(
          userId,
          client,
          this.server,
        );
        console.log(`client ${client.id} 上线, userId: ${userId}`);
      } else {
        this.eventsService.handleAdminSocketConnection(
          adminUserId,
          client,
          this.server,
        );
        console.log(`client ${client.id} 上线, adminUserId: ${adminUserId}`);
      }
    } catch (err) {
      console.log('err', err);
      client.disconnect();
    }
  }
}
