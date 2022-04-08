/* 
  目前 webpack 只能打包 js 文件，是否可以打包其他资源 ?
  还可以使用内置的资源模块,叫 asset module（是一种模块类型） 来引入其他的类型资源（字体、图标等）
  资源模块的类型称为 asset module type, 会通过四种新的类型模块来替换所有的 loader
    asset/resource : 发送一个单独的文件并导出 URL
    asset/inline: 会导出一个资源的 Data URL
    asset/source: 会导出资源的源代码
    asset: 会在导出一个 Data URL 和 发送一个单独的文件之间自动进行选择
*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 定义入口文件, 字符串形式
  entry: './src/index.js',

  // 定义输出文件, 对象形式: filename、path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
    // 定义资源模块的文件名: 路径、文件名、后缀
    assetModuleFilename: 'images/[contenthash][ext]'
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
  },

  module: {
    rules: [
      {
        test: /\.png$/,
        type: 'asset/resource',
        // 定义资源模块的文件名: 路径、文件名、后缀
        generator: {
          filename: 'images/[contenthash][ext]'
        }
      },
      {
        test: /\.svg$/,
        type: 'asset/inline',
      },
      {
        test: /\.txt$/,
        type: 'asset/source'
      },
      // 默认: 资源文件大小 >8k, 会创建一个资源
      // <8k , 会作为 inline 生成 base64 的链接
      {
        test: /\.jpg$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 * 1024
          }
        }
      }
    ],
  }
}