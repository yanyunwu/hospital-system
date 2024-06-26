// https://umijs.org/config/
import { defineConfig } from '@umijs/max'
import routes from './routes'
// import { join } from 'path'
import { theme } from 'antd'
import { convertLegacyToken } from '@ant-design/compatible'
import defaultSettings from './defaultSettings'
import proxy from './proxy'

const { defaultAlgorithm, defaultSeed } = theme
const mapV5Token = defaultAlgorithm(defaultSeed)
const v5Vars = convertLegacyToken(mapV5Token)

const { REACT_APP_ENV } = process.env

export default defineConfig({
  define: {
    __SOCKET_BASE_URL__: 'ws://hospital.api.yanyun.ltd',
    __BASE_URL__: 'http://hospital.api.yanyun.ltd',
    __FILE_BASE_URL__: 'http://file.yanyun.ltd'
  },
  lessLoader: {
    modifyVars: v5Vars,
  },
  // dva: {
  //   // hmr: true,
  // },
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
  // dynamicImport: {
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },
  // umi routes: https://umijs.org/docs/routing
  routes,

  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
  }, // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  // esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: 'http://localhost:3000/',
  },
  // Fast Refresh 热更新
  fastRefresh: true,
  // openAPI: [
  //   {
  //     requestLibPath: 'import { request } from \'umi\'',
  //     // 或者使用在线的版本
  //     // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
  //     schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   },
  //   {
  //     requestLibPath: 'import { request } from \'umi\'',
  //     schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //     projectName: 'swagger',
  //   },
  // ],
  // nodeModulesTransform: {
  //   type: 'none',
  // },
  mfsu: {},
  // webpack5: {},
  // exportStatic: {},
  // extraPostCSSPlugins: [require('tailwindcss'), require('autoprefixer')],
  initialState: {},
  model: {},
  request: {},
  esbuildMinifyIIFE: true,
  tailwindcss: {},
})
