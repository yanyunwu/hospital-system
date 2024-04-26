import { request } from '@umijs/max'
import { TableListItem } from '../type'

const GET_URL = '/api/rr/getRRList'
const SET_URL = '/api/rr/setRR'
const ADD_URL = ''
const DEL_URL = '/api/rr/delRR'

export async function get(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const { current, pageSize, ...rest } = params
  const response = await request<{
    data: {
      data: TableListItem[];
      total?: number;
      success?: boolean;
    };
  }>(GET_URL, {
    method: 'GET',
    params: {
      skip: current && current - 1,
      take: pageSize,
      ...rest,
    },
    ...options,
  })

  return response.data
}

export async function set(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(SET_URL, {
    data,
    method: 'POST',
    ...options,
  })
}

export async function add(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(ADD_URL, {
    data,
    method: 'POST',
    ...options,
  })
}

export async function del(data: { ids: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>(DEL_URL, {
    data,
    method: 'POST',
    ...options,
  })
}
