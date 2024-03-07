import { request } from 'umi'

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
  })
}

export async function getSessionMessageList(id: number) {
  return request('/api/admin/session/getSessionMessageList', {
    method: 'GET',
    params: {
      id,
    },
  })
}

export async function replySession(sessionId: number) {
  return request('/api/admin/session/replySession', {
    method: 'POST',
    data: {
      sessionId,
    },
  })
}

export async function setSessionStatus(sessionId: number, status: number) {
  return request('/api/admin/session/setSessionStatus', {
    method: 'POST',
    data: {
      sessionId,
      status,
    },
  })
}

export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/admin/user/getOwnerAdminUser', {
    method: 'GET',
    ...(options || {}),
  })
}
