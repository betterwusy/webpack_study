// 解决作用域问题: 使用立即调用函数
// 1. 立即调用函数内部的变量是不能在外部访问的
// 即不会污染 window 对象 ,也就解决了作用域问题
; (function () {
  var myName = 'wsy1'
})()

// 这里访问不到 myName 变量
// console.log(myName);

// 2. 需要向外暴露内容时: 
// 立即调用函数返回需暴露的内容, 并使用一个变量接收
var result = (function(){
  var myName = 'wsy2'
  return myName;
})()
console.log(result);

// grant 和 gulp 用这种方式解决作用域问题
// 存在的问题:
//  需要修改任何一段代码中的一小部分，需要全部重新编译
