interface Route {
  // 标识符
  identifier: string;
  // 路由名称
  name: string;
  // 路由路径
  path: string;
  // 描述
  description?: string;
  pub?: boolean;
}

export default [
  {
    identifier: 'dashboard.analysis',
    name: '仪表盘-数据页',
    path: '/dashboard/analysis',
    pub: true,
  },
  {
    identifier: 'access.role',
    name: '权限管理-角色管理',
    path: '/access/role',
  },
  {
    identifier: 'access.auth',
    name: '权限管理-权限管理',
    path: '/access/auth',
  },
  {
    identifier: 'customer.admin',
    name: '用户管理-系统人员管理',
    path: '/customer/admin',
  },
  {
    identifier: 'customer.user',
    name: '用户管理-用户信息管理',
    path: '/customer/user',
    // pub: true,
  },
  {
    identifier: 'session.chat',
    name: '会话管理-实时会话',
    path: '/session/chat',
    pub: true,
  },
  {
    identifier: 'session.chat-list',
    name: '会话管理-会话信息管理',
    path: '/session/chat-list',
    pub: true,
  },
  {
    identifier: 'community.post',
    name: '心理社区管理-帖子管理',
    path: '/community/post',
    // pub: true,
  },
  {
    identifier: 'booking.booking',
    name: '预约管理-预约服务管理',
    path: '/booking/booking',
    pub: true,
  },
  {
    identifier: 'booking.record',
    name: '预约管理-预约记录管理',
    path: '/booking/record',
    pub: true,
  },
  {
    identifier: 'rr.rr',
    name: '转诊报销-报销审核',
    path: '/rr/rr',
    pub: true,
  },
  {
    identifier: 'other.feedback',
    name: '其他功能-意见反馈',
    path: '/other/feedback',
    pub: true,
  },
  {
    identifier: 'other.sysNotice',
    name: '其他功能-首页通知',
    path: '/other/sysNotice',
    pub: true,
  },
] as Route[];
