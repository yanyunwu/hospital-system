import { Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const ADMIN_ROOM = 'admin_room'

@Injectable()
export class EventsService {
    clientMap: Map<string, Socket>
    adminClientMap: Map<string, Socket>

    constructor() {
        this.clientMap = new Map()
        this.adminClientMap = new Map()
    }

    // 处理客户端
    handleClientSocketConnection(openId: string, socket: Socket, server: Server) {
        this.clientMap.set(openId, socket)
        server.to(ADMIN_ROOM).emit('new_client', {})
        socket.on('disconnect', () => {
            this.clientMap.delete(openId)
        })

        // 接受到消息群发给后台
        socket.on('message', (message) => {
            server.to(ADMIN_ROOM).emit('message', message)
        })
    }

    // 处理后台系统
    handleAdminSocketConnection(adminUserId: string, socket: Socket, server: Server) {
        this.adminClientMap.set(adminUserId, socket)
        socket.join(ADMIN_ROOM)

        socket.on('disconnect', () => {
            socket.leave(ADMIN_ROOM)
            this.adminClientMap.delete(adminUserId)
        })

        socket.on('message', (message) => {
           const openId = message.openId
           const client = this.clientMap.get(openId)
           console.log('handleAdminSocketConnection', message, client)
           client?.send({...message,  adminUserId: adminUserId})
        })
    }
}
