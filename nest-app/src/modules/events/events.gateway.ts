import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { jwtConstants } from '../admin/login/constants';
  
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection,OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  clientMap: Map<string, Socket>
  adminClientMap: Map<string, Socket>

  constructor(
    private jwt: JwtService
  ) {
    this.clientMap = new Map()
    this.adminClientMap = new Map()
  }


  handleDisconnect(client: Socket) {
      console.log(`client ${client.id} 下线了`)
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const query = client.handshake.query
    try {
      const payload = await this.jwt.verifyAsync(query.token as string, {
        secret: jwtConstants.secret,
      });
      
      const openId = payload.openid
      const adminUserId = payload.adminUserId
      if (openId) {
        this.clientMap.set(openId, client)
        console.log(`client ${client.id} 上线, openid: ${openId}`)
        client.on('disconnect', () => {
          this.clientMap.delete(openId)
        })
      } else {
        this.adminClientMap.set(adminUserId, client)
        console.log(`client ${client.id} 上线, adminUserId: ${adminUserId}`)
        client.on('disconnect', () => {
          this.adminClientMap.delete(adminUserId)
        })
      }

    } catch(err) {
      console.log('err', err)
      client.disconnect()
    }
  }

  @SubscribeMessage('message')
  handleMsg(@MessageBody() body: any, @ConnectedSocket() client: Socket,) {
          console.log('client msg', body);
  }
}