import { request } from '@umijs/max'

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

export async function setCurrentUser(data?: { [key: string]: any }) {
  return request('/api/admin/user/setOwnerAdminUser', {
    method: 'POST',
    data: data
  })
}

export async function getCommunityReplies(id: number) {
  return request('/api/community/getReplies', {
    method: 'GET',
    params: {
      id
    }
  })
}

export async function getAdminUserInfo(id: number) {
  return request('/api/admin/user/getOneAdminUser', {
    method: 'GET',
    params: {
      id
    }
  })
}

export async function getUserInfo(id: number) {
  return request('/api/mp/user/getOneUserInfo', {
    method: 'GET',
    params: {
      id
    }
  })
}

export async function getSexCount() {
  return request('/api/visualization/getSexCount', {
    method: 'GET',
  })
}

export async function getCommunityAdd() {
  return request('/api/visualization/getCommunityAdd', {
    method: 'GET',
  })
}

export async function getOverview() {
  return request('/api/visualization/getOverview', {
    method: 'GET',
  })
}

export async function getPeopleAdd() {
  return request('/api/visualization/getPeopleAdd', {
    method: 'GET',
  })
}

export async function getSessionAdd() {
  return request('/api/visualization/getSessionAdd', {
    method: 'GET',
  })
}

export async function getTopUserPosts() {
  return request('/api/visualization/getTopUserPosts', {
    method: 'GET',
  })
}

export async function getTopUserPostReplys() {
  return request('/api/visualization/getTopUserPostReplys', {
    method: 'GET',
  })
}


export async function getModels() {
  return request('/api/model/models', {
    method: 'GET',
  })
}

export async function setSysConfig(key: string, value: Record<string, any>) {
  return request('/api/config/setSysConfig', {
    method: 'POST',
    data: {
      key,
      value
    }
  })
}

export async function getSysConfig(key: string) {
  return request('/api/config/getSysConfig', {
    method: 'GET',
    params: {
      key
    }
  })
}








