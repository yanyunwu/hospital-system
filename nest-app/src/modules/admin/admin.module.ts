import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { AccessModule } from './access/access.module';

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
          }
        ],
      },
    ]),
    LoginModule,
    AccessModule,
    UsersModule
  ],
})
export class AdminModule {}
