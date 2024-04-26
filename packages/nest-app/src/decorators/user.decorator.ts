import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export type UserType = {
  openid?: string;
  adminUserId?: number;
  userId?: number;
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request['user'] || {};
    const res: UserType = {
      openid: user.openid,
      adminUserId: parseInt(user.adminUserId),
      userId: parseInt(user.userId),
    };

    return res;
  },
);
