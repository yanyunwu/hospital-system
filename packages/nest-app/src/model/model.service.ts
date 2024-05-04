import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as https from 'https';
import { TOKEN } from './consts';
import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class ModelService {
  constructor(private configService: ConfigService) {}

  async requestChat(
    message: string,
    ctx?: Array<{ role: string; content: string }>,
    stream?: boolean,
  ) {
    const config = await this.configService.getJsonValue('bot');
    const messages = [];
    if (ctx) {
      messages.push(...ctx);
    }

    console.log('messagesmessages', messages);

    return axios.post(
      'https://api.aigcbest.top/v1/chat/completions',
      {
        model: config?.model || 'gpt-3.5-turbo',
        messages: [
          ...messages,
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: config?.temperature ?? 0.7,
        stream: stream ?? true,
        max_tokens: config?.maxTokens ?? undefined,
      },
      {
        responseType: stream ? 'stream' : 'json',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Connection: 'keep-alive',
        },
        timeout: 10000,
      },
    );
  }

  getModels() {
    return axios.get('https://api.aigcbest.top/v1/models', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  }
}
