const fs = require('fs');
const path = require('path');

module.exports = {
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
  }

  // configureWebpack: config => {
  //   // if (isProduction) {
  //   config.externals = {
  //     echarts: 'echarts'
  //   };
  //   // }
  // }
};
