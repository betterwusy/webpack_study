
// 解决代码拆分问题：
//   webpack 运行在 node.js 中
//   使用 node.js 的 commonjs 功能, 可以导入和使用某个模块

const add = (x, y) => {
  return x + y;
}

const minus = (x, y) => {
  return x - y;
}

// 使用 node.js 的 commonjs 提供的 module.exports 向外暴露模块
module.exports = {
  add,
  minus
}