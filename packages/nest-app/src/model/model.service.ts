import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TOKEN } from './consts';
import { ConfigService } from 'src/modules/config/config.service';

@Injectable()
export class ModelService {
  constructor(private configService: ConfigService) {}

  async requestChat(
    message: string,
    ctx?: Array<{ role: string; content: string }>,
  ) {
    const config = await this.configService.getJsonValue('bot');
    const messages = [];
    if (ctx) {
      messages.push(...ctx);
    }

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
        stream: true,
        max_tokens: config?.maxTokens ?? undefined,
      },
      {
        responseType: 'stream',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
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
