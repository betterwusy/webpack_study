// requirejs 提供的 reuire 方法
// 第一个参数是我们需要依赖的模块数组, 第二个参数回调函数
// (回调函数的两个参数分别指向两个引用模块的回调函数中暴露的内容)
// 此处访问的参照的目录点是外部的html-6的位置
require(['./requirejs/add.js', './requirejs/minus.js'], function (add, minus) {
    console.log(add(4, 5));
})