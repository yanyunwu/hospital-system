import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { FeedbackService } from './feedback.service';
import { LoginService } from '../mp/login/login.service';
import { Feedback } from 'src/entities/feedback.entity';

@Controller('/api/feedback')
export class FeedbackController {
  constructor(
    private feedbackService: FeedbackService,
    private loginService: LoginService,
  ) {}

  @Get('/getFeedbackList')
  async getFeedbackList(
    @Query() qurey: { skip?: number; take?: number; [key: string]: any },
  ) {
    const { skip = 0, take = 20, ...options } = qurey;
    const [data, count] = await this.feedbackService.getFeedbackList(
      skip,
      take,
      options as Feedback,
    );

    return {
      data,
      total: count,
      success: true,
    };
  }

  @Post('/addFeedback')
  async addFeedback(@Body() body: Feedback, @Req() req: Request) {
    const payload = req['user'];
    const user = await this.loginService.getUserByOpenId(payload.openid);
    body.user = user;
    return this.feedbackService.addFeedback(body);
  }
}
