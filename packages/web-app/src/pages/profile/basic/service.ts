import { request } from '@umijs/max'
import type { BasicGood, BasicProgress } from './data.d'

export async function queryBasicProfile(): Promise<{
  data: {
    basicProgress: BasicProgress[];
    basicGoods: BasicGood[];
  };
}> {
  return request('/api/profile/basic')
}
