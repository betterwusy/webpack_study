/* 
  babel-loader:
    默认情况下, webpack 不会转换es6的代码
    使用 babel-loader插件可以转换es6的代码为es5

  1. 安装三个插件
    babel-loader: 在webpack里应用 babel 解析es6的桥梁
    @babel/core: babel核心模块
    @babel/preset-env: babel预设, 一组babel插件的集合
    @babel/plugin-transform-runtime: babel runtime时所需要

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
      },
      {
        test: /\.js$/,
        exclude:/node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-transform-runtime'
              ]
            ]
          }
        }
      }
    ]
  },

  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
}