// https://umijs.org/config/
import { defineConfig } from 'umi'

export default defineConfig({
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  define: {
    __SOCKET_BASE_URL__: 'ws://localhost:3000',
    __BASE_URL__: ''
  }
})
