// 1.配置 mode 选项 mode: development
// 2.新增 sourcemap 来对代码进行调试 devtool: 'inline-source-map'
// 3.使用命令: npx webpack --watch 来打开监测模式, 一修改js文件webpack就会自动重新编译
// 4.使用 webpack-dev-server 来使一旦文件修改, 浏览器自动刷新
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 定义入口文件, 字符串形式
  entry: './src/index.js',

  // 定义输出文件, 对象形式: filename、path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true
  },

  mode: 'development',

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin 对象的选项
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    })
  ],

  // 配置 webpack-dev-server
  devServer: {
    static: './dist' // 指定 devServer 的根目录
  }
}