import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';

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
        ],
      },
    ]),
    LoginModule
  ],
})
export class AdminModule {}
