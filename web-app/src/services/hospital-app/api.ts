import { request } from 'umi';

export async function getRoleList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: Record<string, any>,
) {
  return request<API.Role>('/api/admin/access/getRole', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
