import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TOKEN } from './consts';

@Injectable()
export class ModelService {
  requestChat(message: string) {
    return axios.post(
      'https://api.aigcbest.top/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        stream: true,
      },
      {
        responseType: 'stream',
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
  }
}
