/* 
代码分离:

1. entry 的配置方法: 
  - 在 entry 字段定义多个入口文件(对象形式)
    再在 output 字段定义多个输出文件
  - 缺点: 多个入口文件引用了同样的模块, 会在多个出口文件重复打包

2. 防止重复:
  - 在 entry 字段定义多个入口文件对象，其中包含import和dependOn
  - 在 shared 中定义需共享的模块
  - 或使用 webpack内置的 split-chunks-plugin插件

动态导入:


*/
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  // 定义入口文件, 对象形式, 多入口
  entry: {
    index: './src/index.js',
    another: './src/another-module.js'
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared'
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared'
    // },
    // shared: 'lodash'
  },

  // 定义输出文件, 对象形式: filename、path
  output: {
    // 配置多个输出文件
    filename: '[name].bundle.js',
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
    ],

    splitChunks: {
      chunks: 'all'
    }
  }
}