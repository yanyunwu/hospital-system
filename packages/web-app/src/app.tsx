import type { Settings as LayoutSettings } from '@ant-design/pro-layout'
import { SettingDrawer } from '@ant-design/pro-layout'
import { PageLoading } from '@ant-design/pro-layout'
import type { RunTimeLayoutConfig, RequestConfig } from 'umi'
import { history, Link } from 'umi'
import RightContent from '@/components/RightContent'
import Footer from '@/components/Footer'
import { currentUser as queryCurrentUser } from './services/hospital-app'
import { BookOutlined, LinkOutlined } from '@ant-design/icons'
import defaultSettings from '../config/defaultSettings'
import Logo from '../public/hzaulogo.jpg'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/user/login'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser()
      msg.data.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      // @ts-ignore
      msg.data.name = msg.data.nickname
      return msg.data
    } catch (error) {
      history.push(loginPath)
    }
    return undefined
  }
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    title: '华中农业大学',
    logo: () => <img style={{'borderRadius': 1000}} src={Logo}></img>,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath)
      }
    },
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs" key="docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }))
              }}
            />
          )}
        </>
      )
    },
    ...initialState?.settings,
  }
}


// 全局请求 封装一下身份验证的东西
const requestInterceptor = (url: string, options: any) => {
  const access_token = localStorage.getItem('token')
  return {
    url: `${__BASE_URL__}${url}`,
    options: {
      ...options,
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    },
  }
}

// 全局请求 封装一下身份验证的东西
const responseInterceptor = (response: any) => {
  if (response.status === 401) {
    if (!location.pathname.startsWith(loginPath)) {
      message.error('登录失效')
      history.push(loginPath)
    }
  }
  return response
}

export const request: RequestConfig = {
  timeout: 10000,
  errorConfig: {},
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
  errorHandler: (err) => {
    console.log(err)
  }
}
