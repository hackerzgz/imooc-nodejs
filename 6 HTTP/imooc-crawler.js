// HTTP网络爬虫

var http = require('http')
var url = 'http://cn.bing.com'

http.get(url, function (res) {
    // 默认html变量为一个空值
    var html = ''

    // 这是一个监听函数
    // 每当有data事件加载，回调函数就会被触发
    // 然后将data数据加在html变量后面
    res.on ('data' ,function(data) {
        html += data
    })

    // 这是一个监听函数
    // 当res的end事件被触发，就会打印出html变量
    res.on('end', function () {
        console.log(html)
    })
    // 这是一个监听函数
    // 当get方法的error事件被触发，就会打印出字符串
}).on('error' ,function () {
    console.log('获取数据出错')
})



