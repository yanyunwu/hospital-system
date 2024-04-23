export default  [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: '仪表盘',
    icon: 'dashboard',
    access: 'dashboard.analysis',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/analysis',
        access: 'dashboard.analysis'
      },
      {
        name: '数据页',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
        access: 'dashboard.analysis'
      }
    ],
  },
  {
    path: '/access',
    icon: 'SafetyOutlined',
    name: '权限管理',
    routes: [
      {
        name: '角色管理',
        icon: 'smile',
        path: '/access/role',
        component: './access/role',
        access: 'access.role'
      },
      {
        name: '权限管理',
        icon: 'smile',
        path: '/access/auth',
        component: './access/auth',
        access: 'access.auth'
      },
    ],
  },
  {
    path: '/customer',
    icon: 'UserOutlined',
    name: '用户管理',
    routes: [
      {
        name: '系统人员管理',
        icon: 'smile',
        path: '/customer/admin',
        component: './user/admin',
        access: 'customer.admin'
      },
      {
        name: '用户信息管理',
        icon: 'smile',
        path: '/customer/user',
        component: './user/user',
        access: 'customer.user'
      },
    ],
  },
  {
    path: '/session',
    icon: 'MessageOutlined',
    name: '会话管理',
    routes: [
      {
        name: '实时会话',
        icon: 'smile',
        path: '/session/chat',
        component: './session/chat',
        access: 'session.chat'
      },
      // {
      //   name: '会话信息管理',
      //   icon: 'smile',
      //   path: '/session/chat-list',
      //   component: './session/chat-list',
      //   access: 'session.chat-list'
      // },
    ],
  },
  {
    path: '/community',
    icon: 'TeamOutlined',
    name: '心理社区管理',
    routes: [
      {
        name: '帖子管理',
        icon: 'smile',
        path: '/community/post',
        component: './community/post',
        access: 'community.post'
      },
    ],
  },
  {
    path: '/booking',
    icon: 'BookOutlined',
    name: '预约管理',
    routes: [
      {
        name: '预约服务管理',
        icon: 'smile',
        path: '/booking/booking',
        component: './booking/booking',
        access: 'booking.booking'
      },
      {
        name: '预约记录管理',
        icon: 'smile',
        path: '/booking/record',
        component: './booking/record',
        access: 'booking.record'
      },
    ],
  },
  {
    path: '/rr',
    icon: 'CopyOutlined',
    name: '转诊报销',
    routes: [
      {
        name: '报销审核',
        icon: 'smile',
        path: '/rr/rr',
        component: './rr/rr',
        access: 'rr.rr'
      },
    ],
  },
  {
    path: '/other',
    icon: 'SettingOutlined',
    name: '其他功能',
    routes: [
      {
        name: '意见反馈',
        icon: 'smile',
        path: '/other/feedback',
        component: './other/feedback',
        access: 'other.feedback'
      },
      // {
      //   name: '首页通知',
      //   icon: 'smile',
      //   path: '/other/sysNotice',
      //   component: './other/sysNotice',
      //   access: 'other.sysNotice'
      // },
    ],
  },
  {
    path: '/account',
    routes: [
      {
        name: '个人中心',
        path: '/account/center',
        component: './account/center',
      },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard/analysis',
  },
  {
    path: '*',
    layout: false,
    component: '404',
  },
]
