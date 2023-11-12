import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/admin',
        children: [
          {
            path: '/login',
            module: LoginModule,
          },
        ],
      },
    ]),
    LoginModule,
    UsersModule,
  ],
})
export class AdminModule {}
