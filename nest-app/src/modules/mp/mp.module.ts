import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/api/mp',
        children: [
          {
            path: '/',
            module: LoginModule,
          },
          {
            path: '/user',
            module: UserModule,
          },
        ],
      },
    ]),
    UserModule,
    LoginModule,
  ],
  providers: [],
})
export class MpModule {}
