const apiUrl = require('./package.json').apiUrl;

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "src/styles/_global.scss";',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: apiUrl,
        secure: false
      },
      '/p': {
        target: apiUrl,
        secure: false
      }
    }
  }
}