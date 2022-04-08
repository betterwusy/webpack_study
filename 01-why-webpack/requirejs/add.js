const add = (x, y) => {
  return x + y;
}
// 使用 define() 方法向外暴露该模块
// 第一个参数是数组, 表示该模块引用的其他模块
// 第二个参数是回调函数，表示该模块真正对外暴露的内容
define([], function () {
  return add
})