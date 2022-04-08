// 该配置文件名是固定的, 因为这是 webpack 默认读取的配置文件名
// 该文件是在 node.js 环境下运行的, 因此使用 node.js 的 commonjs( module.exports )

const path = require('path')
module.exports = {
  // 定义入口文件, 字符串形式
  entry: './src/index.js',

  // 定义输出文件, 对象形式: filename、path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  },

  mode: 'none'
}