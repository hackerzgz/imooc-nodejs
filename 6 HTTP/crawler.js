// HTTP网络爬虫(爬出有效信息)

var http = require('http')
var cheerio = require('../../node_modules/cheerio/lib/cheerio')
var url = 'http://www.imooc.com/learn/348'

function filterChapters(html) {
    // cheerio 像jquery一样，可以装载操作html
    var $ = cheerio.load(html)

    var chapterArray = $('.chapter');

    // 文档结构
    // [{
    //     chapterTitle:'',
    //     videos:[
    //         title:'',
    //         id:''
    //     ]
    // }]
    var courseArray = []

    chapterArray.each((index,item) => {
        var chapter = $(item);
        var chapterTitle = chapter.find('strong').text();
        var videos = chapter.find('.video').children('li');
        var chaptData = {
            chapterTitle:chapterTitle,
            videos: []
        }

        videos.each((index,item) => {
            var video = $(item).find('.studyvideo');
            var videoTitle = video.text();
            // split方法为字符串分割
            var id = video.attr('href').split('video/')[1];

            chaptData.videos.push({
                title: videoTitle,
                id: id
            })
        })

    courseArray.push(chaptData)

    })
    return courseArray
}




function printCouseArray(courseArray){
    courseArray.forEach((item) => {
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle +'\n');

        item.videos.forEach(function(video){
            var id = video.id;
            var videoTitle = video.title;
            console.log(' ['+id+'] '+ videoTitle);
        })
    })
}



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
        var courseData = filterChapters(html)

        printCouseArray(courseData)
    })
    // 这是一个监听函数
    // 当get方法的error事件被触发，就会打印出字符串
}).on('error' ,function () {
    console.log('获取课程数据出错')
    })