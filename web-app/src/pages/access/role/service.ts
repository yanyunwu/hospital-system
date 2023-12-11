// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { TableListItem } from './data';

/** 获取规则列表 GET /api/rule */
export async function role(
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
  }>('/api/admin/access/getRole', {
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
export async function setRole(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/admin/access/setRole', {
    data: {
      ...data,
      auths: data.auths.join(','),
    },
    method: 'POST',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRole(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/admin/access/addRole', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function delRole(data: { ids: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/admin/access/delRole', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
