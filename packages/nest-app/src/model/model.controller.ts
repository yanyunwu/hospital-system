import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Res,
  Sse,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { Observable, interval, map, of, take } from 'rxjs';
import { Response } from 'express';
import { Public } from 'src/modules/admin/login/decorators';
import { SessionService } from 'src/modules/admin/session/session.service';
import { ConfigService } from 'src/modules/config/config.service';

@Controller('/api/model')
export class ModelController {
  constructor(
    private readonly modelService: ModelService,
    private sessionService: SessionService,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post('/chat')
  @Header('Content-Type', 'text/event-stream')
  @HttpCode(200)
  async chat(
    @Res() res: Response,
    @Body()
    body: {
      message: string;
      chatID?: number;
    },
  ) {
    const messages = [];

    const config = await this.configService.getJsonValue('bot');
    if (config) {
      const zSetting = config.zSetting;
      if (zSetting) {
        messages.push({
          role: 'assistant',
          content: zSetting,
        });
      }
    }

    if (body.chatID) {
      const chatMessages = await this.sessionService.getSessionMessageList(
        body.chatID,
      );

      messages.push(
        ...chatMessages.map((item) => {
          return {
            role: item.speakUserType === 1 ? 'assistant' : 'user',
            content: item.content,
          };
        }),
      );
    }

    const response = await this.modelService.requestChat(
      body.message,
      messages,
    );
    response.data.pipe(res);
  }

  @Public()
  @Get('/models')
  async models() {
    const response = await this.modelService.getModels();
    return response.data?.data;
  }
}
