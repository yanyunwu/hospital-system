import { request } from 'umi';
import type { BasicListItemDataType } from './data.d';
import { getFakeList } from './_mock';

type ParamsType = {
  count?: number;
} & Partial<BasicListItemDataType>;

export async function queryFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return getFakeList()
}

export async function removeFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateFakeList(
  params: ParamsType,
): Promise<{ data: { list: BasicListItemDataType[] } }> {
  return request('/api/post_fake_list', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
