// eslint-disable-next-line @typescript-eslint/no-var-requires
const { execSync } = require('child_process');

module.exports = {
  publicPath: '',
  lintOnSave: 'warning',
  productionSourceMap: true,
  css: {
    sourceMap: true,
  },
  devServer: {
    host: '0.0.0.0',
    port: 4321,
  },
  chainWebpack: (webpackConfig) => {
    webpackConfig.plugin('define').tap((args) => {
      args[0]['process.env'].GIT_COMMIT = JSON.stringify(
        process.env.COMMIT_REF ||
          execSync('git rev-parse HEAD')
            .toString()
            .trim() ||
          ''
      );
      args[0]['process.env'].BUILD_DATE = JSON.stringify(
        new Date().toISOString()
      );
      return args;
    });
  },
};
