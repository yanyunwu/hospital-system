import {
  Body,
  Controller,
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

@Controller('/api/model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Public()
  @Post('/chat')
  @Header('Content-Type', 'text/event-stream')
  @HttpCode(200)
  async chat(
    @Res() res: Response,
    @Body()
    body: {
      message: string;
    },
  ) {
    const response = await this.modelService.requestChat(body.message);
    response.data.pipe(res);
  }
}
