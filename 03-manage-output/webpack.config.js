// 使用 html-webpack-plugin 插件, 定义 webpack 打包后的输出文件script标签自动注入到html中

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

  mode: 'none',

  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin 对象的选项
      template: './index.html',
      filename: 'app.html',
      inject: 'body'
    })
  ]
}