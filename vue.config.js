const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // 开发及部署时的URL
  publicPath: '/xf-shop',
  // 配置代理
  devServer: {
    // proxy:"http://backend-api-01.newbee.ltd"
    proxy: {
      '/api': {
        target: 'http://localhost:28019',
      },
    },
  },
});
