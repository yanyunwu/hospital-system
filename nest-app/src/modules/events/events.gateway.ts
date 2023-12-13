import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayDisconnect,
    OnGatewayConnection
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
  export class EventsGateway implements OnGatewayConnection,OnGatewayDisconnect {
    handleDisconnect(client: any) {
        console.log('un ', client.id)
    }
    handleConnection(client: Socket, ...args: any[]) {
        console.log('client', client.handshake.query);
    }

    

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('newMessage')
    handleMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket,) {
        console.log('client', body);
    }

    @SubscribeMessage('message')
    handleMsg(@MessageBody() body: any, @ConnectedSocket() client: Socket,) {
            console.log('client msg', body);
    }

    @SubscribeMessage('events')
    findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
      return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }
  
    @SubscribeMessage('identity')
    async identity(@MessageBody() data: number): Promise<number> {
      return data;
    }
  }