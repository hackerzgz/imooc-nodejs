// Promise 风格的 Crawler

var http = require('http')
var Promise = require('../../node_modules/bluebird/js/browser/bluebird.js')
var cheerio = require('../../node_modules/cheerio/lib/cheerio')
var baseUrl = 'http://www.imooc.com/learn/'
var videoIds=[348, 259, 197, 134, 75]

function filterChapters(html) {
    // cheerio 像jquery一样，可以装载操作html
    var $ = cheerio.load(html)

    var chapterArray = $('.chapter');
    var title = $('.hd .l').text();
    var number= parseInt($($('.meta-value')[2]).text().trim(), 10);
    // 文档结构
    // courseData = {
    //     title: title,
    //     number: number,
    //     videos: [{
    //         chapterTitle:'',
    //         videos:[
    //             title:'',
    //             id:''
    //         ]
    //     }]
    // }
    var courseArray = {
        title: title,
        number: number,
        videos: []
    }

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

    courseArray.videos.push(chaptData)

    })
    return courseArray
}




function printCouseArray(coursesData) {
    coursesData.forEach((courseData)=> {
        console.log(courseData.number + ' 人学过 ' + courseData.title + '\n')
    })

    coursesData.forEach((courseData) => {
        console.log('### ' + courseData.title + '\n');

        courseData.videos.forEach((item) => {

            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle +'\n');

            item.videos.forEach(function(video){
                var id = video.id;
                var videoTitle = video.title;
                console.log(' ['+id+'] '+ videoTitle);
            })
        })
    })
}


function getPageAsync(url) {
    return new Promise(function(resolve, reject) {
        console.log('正在爬取 ' + url);
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
            // 当res的end事件被触发，读取正确-> resolve
            res.on('end', function () {
                resolve(html);
            })
            // 这是一个监听函数
            // 当get方法的error事件被触发，读取错误-> reject
        }).on('error' ,function (e) {
            reject(e);
            console.log('获取课程数据出错');
        })
    })
}


var fetchCourseArray = [];

videoIds.forEach(function(id) {
    fetchCourseArray.push(getPageAsync(baseUrl + id));
})

Promise
    .all(fetchCourseArray)
    .then(function(pages) {
        var courseData = [];

        pages.forEach(function(html) {
            var courses = filterChapters(html);

            courseData.push(courses);
        })
        // 排序，按照人数从高到低排序
        courseData.sort(function(a, b) {
            return a.number < b.number;
        });

        printCouseArray(courseData)
    })

