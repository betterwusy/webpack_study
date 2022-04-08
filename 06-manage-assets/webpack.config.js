/* 
  webpack 除了可以用 资源模块(asset module)来引入其他资源
    还可以用 loader 来引入(解析)其他资源
  什么是 loader ？
    webpack 只能解析js、json这样的资源文件，这是 webpack 开箱可用的自带的能力
    loader 可以让 webpack 去解析其他的类型的文件, 并将这些文件转换为有效的可用的模块, 以供应用程序使用
    loader 的定义: test、use 两个属性
  抽离和压缩 css:
    1. 抽离 css:
      引入 MiniCssExtractPlugin 插件, 结合 html-webpack-plugin 插件,
      可使项目的样式文件解析后生成 main.css, 
      并自动在 html 的<head>标签里的<link>标签中引入
       - 可实例化时传入参数指定路径和文件名
    2. 压缩 css:
      引入 CssMinimizerPlugin 插件, 设置 optimization 和 mode , 
      实现压缩 css 代码
  加载 imges 图片:
    使用 background-image css样式为div添加背景图片
  加载 fonts 字体:
    使用资源模块(asset module)
  加载数据:
    使用 xml-loader 、 csv-loader 来解析xml和csv类型的文件
    xml被解析成js对象、csv被解析成数组

*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

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
    }),

    new MiniCssExtractPlugin({
      // 生成实例时, 传入参数指定生成的css文件的路径和名称
      filename: 'styles/[contenthash].css'
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
      },
      // 使用 css-loader 对 css 文件进行解析
      // 使用 style-loader 将样式自动化放到html <head> 标签里的 <style> 标签里
      {
        test: /\.(css|less)$/,
        // use: ['style-loader', 'css-loader', 'less-loader'],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(csv|tsv)$/,
        use: 'csv-loader'
      },
      {
        test: /\.xml$/,
        use: 'xml-loader'
      }
    ]
  },

  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
}