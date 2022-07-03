// defineConfig  仅用于语法提示
const { defineConfig } = require("@vue/cli-service");
// const path = require('path') 配合自动修改路径使用
module.exports = defineConfig({
  // babel node_modules 进行转移，安全性，缺点：耗时长
  transpileDependencies: true,

  // 关闭eslint,build serve将不会进行eslint检查
  // lintOnSave: false,

  // 写原生webpack的配置项
  configureWebpack: {
    devServer: {
      open: true,
      port: 3000,
      host: "localhost", // 本地服务器或者是'127.0.0.1'
    },
    /* resolve: {  自动添加路径 解开可使用
      alias: {
        '#': path.join(__dirname, 'src/components')
      }
    } */
  },
});
