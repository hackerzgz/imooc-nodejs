// <script src='a.js'></script>
// <script src='b.js'></script>
// <script src='c.js'></script>

// b.js
// var i = 0
// while(true){
//     i++
// }

var c = 0
/* 输出为0(错误)
// function printIt () {
//     console.log(c)
// }

// function plus () {
//     // 延时函数
//     setTimeout(function () {
//         c += 1
//     } ,1000)
// }

// plus()
// printIt()
*/


// 输出为1 正确
function printIt () {
    console.log(c)
}

function plus (callback) {
    // 延时函数
    setTimeout(function () {
        c += 1
        callback()
    } ,1000)
}
plus(printIt)


