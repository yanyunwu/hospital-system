// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取规则列表 GET /api/rule */
export async function get(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  const { current, pageSize, ...rest } = params || {};

  const response = await request<{
    data: {
      data: TableListItem[];
      /** 列表的内容总数 */
      total?: number;
      success?: boolean;
    };
  }>('/api/booking/getBookingDateRecordList', {
    method: 'GET',
    params: {
      skip: current && current - 1,
      take: pageSize,
      ...rest,
    },
    ...(options || {}),
  });

  return response.data;
}

/** 新建规则 PUT /api/rule */
export async function set(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/admin/user/setUser', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function add(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/admin/user/addUser', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function del(data: { ids: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/admin/user/delUser', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
