const fs = require('fs');
const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      '^/(api|auth|error)': {
        target: 'https://localhost:8000'
      }
    },
    https: {
      key: fs.readFileSync(path.join(__dirname, './server/certs/key.pem')),
      cert: fs.readFileSync(path.join(__dirname, './server/certs/cert.pem'))
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  configureWebpack: config => {
    // if (isProduction) {
    // config.externals = {
    //   echarts: 'echarts'
    // };
    // }
    if (isProduction) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: true
        })
      );
    }
  }
};
