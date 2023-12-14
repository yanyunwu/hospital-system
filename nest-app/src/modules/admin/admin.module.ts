import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { AccessModule } from './access/access.module';
import { SessionModule } from './session/session.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/api/admin',
        children: [
          {
            path: '/',
            module: LoginModule,
          },
          {
            path: '/access',
            module: AccessModule,
          },
          {
            path: '/user',
            module: UsersModule,
          },
          {
            path: '/session',
            module: SessionModule,
          }
        ],
      },
    ]),
    LoginModule,
    AccessModule,
    UsersModule,
    SessionModule,
    MessageModule,
  ],
  controllers: [],
  providers: [],
})
export class AdminModule {}
