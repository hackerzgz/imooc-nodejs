var http = require('http')
var querystring = require('querystring')

var postData = querystring.stringify({
    'content':'一起期待下一期的课程',
    'cid':348,
})

var options = {
    hostname:'www.imooc.com',
    port:80,
    path:'/course/docoment',
    method:'POST',
    headers:{
        // 这里是一些判断是否登陆、是否是正常的用户
        // Content-length   postData.length
        // Cookie   之类的参数，需要转化为键值对
        // 可以在一些网站上先打开 f12
        // 然后post一些数据（发送评论等）
        // 就可以获得该网站post数据时候需要验证的信息了
    }
}


var req = http.request(options ,function (res) {
    console.log('Status:' + res.statusCode)
    console.log('headers:' + JSON.stringify(res.headers))

    // 因为是以流的形式读取数据，所以是Buffer
    res.on('data' ,function (chunk) {
        console.log(Buffer.isBuffer(chunk))
        console.log(typeof chunk)
    })

    res.on('end' ,function () {
        console.log('评论完毕！')
    })   
})
    
res.on('error' ,function (e) {
    console.log('Error：' + e.message)
})

// 发起请求
req.write(postData)
// 请求结束
req.end()
