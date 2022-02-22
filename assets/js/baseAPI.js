// 每次调用$.get或者post或$.ajax 会先调用下面这个函数
// 再这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {

    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})