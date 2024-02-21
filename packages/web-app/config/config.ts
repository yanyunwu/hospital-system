// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import { theme } from 'antd'
import { convertLegacyToken } from '@ant-design/compatible'
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { defaultAlgorithm, defaultSeed } = theme;
const mapV5Token = defaultAlgorithm(defaultSeed);
const v5Vars = convertLegacyToken(mapV5Token);

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: false,
  lessLoader: {
    modifyVars: v5Vars
  },
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
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
      routes: [
        {
          path: '/dashboard',
          redirect: '/dashboard/analysis',
        },
        {
          name: '数据页',
          icon: 'smile',
          path: '/dashboard/analysis',
          component: './dashboard/analysis',
        },
        // {
        //   name: 'monitor',
        //   icon: 'smile',
        //   path: '/dashboard/monitor',
        //   component: './dashboard/monitor',
        // },
        // {
        //   name: 'workplace',
        //   icon: 'smile',
        //   path: '/dashboard/workplace',
        //   component: './dashboard/workplace',
        // },
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
        },
        {
          name: '菜单管理',
          icon: 'smile',
          path: '/access/auth',
          component: './access/auth',
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
        },
        {
          name: '用户信息管理',
          icon: 'smile',
          path: '/customer/user',
          component: './user/user',
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
        },
        {
          name: '会话信息管理',
          icon: 'smile',
          path: '/session/chat-list',
          component: './session/chat-list',
        },
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
        }
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
        },
        {
          name: '预约记录管理',
          icon: 'smile',
          path: '/booking/record',
          component: './booking/record',
        }
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
        },
        {
          name: '首页通知',
          icon: 'smile',
          path: '/other/sysNotice',
          component: './other/sysNotice',
        },
      ],
    },
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      component: '404',
    },
  ],
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: 'http://localhost:3000/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
