import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../admin/message/message.service';

const ADMIN_ROOM = 'admin_room';

@Injectable()
export class EventsService {
  clientMap: Map<string, Socket>;
  adminClientMap: Map<number, Socket>;

  constructor(private messageService: MessageService) {
    this.clientMap = new Map();
    this.adminClientMap = new Map();
  }

  // 处理客户端
  handleClientSocketConnection(
    openId: string,
    socket: Socket,
    server: Server,
    userId: number,
  ) {
    this.clientMap.set(openId, socket);
    server.to(ADMIN_ROOM).emit('new_client', {});
    socket.on('disconnect', () => {
      this.clientMap.delete(openId);
    });

    // 接受到消息群发给后台
    socket.on('message', async (message) => {
      const msg = await this.messageService.addMessage(
        message.sessionId,
        message.text,
        0,
        userId,
      );
      console.log('msg', msg);
      server.to(ADMIN_ROOM).emit('message', msg);
      socket.emit('message_ok', msg);
    });
  }

  // 处理后台系统
  handleAdminSocketConnection(
    adminUserId: number,
    socket: Socket,
    server: Server,
  ) {
    this.adminClientMap.set(adminUserId, socket);
    socket.join(ADMIN_ROOM);

    socket.on('disconnect', () => {
      socket.leave(ADMIN_ROOM);
      this.adminClientMap.delete(adminUserId);
    });

    socket.on('message', async (message) => {
      const openId = message.openId;
      const client = this.clientMap.get(openId);
      console.log('handleAdminSocketConnection', message, client);
      const msg = await this.messageService.addMessage(
        message.sessionId,
        message.text,
        1,
        adminUserId,
      );
      client?.send(msg);
      socket.emit('message_ok', msg);
    });
  }
}
