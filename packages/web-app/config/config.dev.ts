// https://umijs.org/config/
import { defineConfig } from 'umi';
import { theme } from 'antd'
import { convertLegacyToken } from '@ant-design/compatible'

const { defaultAlgorithm, defaultSeed } = theme;

const mapV5Token = defaultAlgorithm(defaultSeed);
const v5Vars = convertLegacyToken(mapV5Token);
// const mapV4Token = theme.getDesignToken(defaultTheme);
// const v4Vars = convertLegacyToken(mapV4Token);

export default defineConfig({
  lessLoader: {
    modifyVars: v5Vars
  },
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  }
});
