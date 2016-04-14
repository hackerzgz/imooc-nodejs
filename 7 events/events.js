var EventEmitter = require('events').EventEmitter

var life = new EventEmitter()

// addEventListener

function water (who) {
    console.log('给 ' + who + ' 倒水')
}

// 这里不用传递形参
life.on('求安慰', water)

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 揉肩')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 煮饭')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' 洗衣服')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' ...5')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' ...6')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' ...7')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' ...8')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' ...9')
})

life.on('求安慰', function (who) {
    console.log('给 ' + who + ' ...10')
})

// 当同一个事件超过10个以上的响应事件（监听器）的时候，nodejs就会抛出异常
// life.on('求安慰', function (who) {
//     console.log('你想累死我啊')
// })
// 但是可以通过 setMaxListeners(n) 方法设置最大响应事件数
// 【注意】setMaxListeners 方法必须放在所有响应事件之前


life.on('求溺爱', function (who) {
    console.log('给 ' + who + ' 买衣服')
})

// 事件触发
// life.emit('求安慰' ,'汉子')

// 检查是否有相对应的事件响应
// var hasConfortListener = life.emit('求安慰','汉子')
// var hasLovedListener = life.emit('求溺爱','妹子')
// var hasPlayedListener = life.emit('求玩坏','汉子和妹子')
// console.log(hasConfortListener)
// console.log(hasLovedListener)
// console.log(hasPlayedListener)

// 移除事件监听器只能移除带有名字的函数，而不能移除回调函数（匿名函数）
// 【注意】需要在调用事件之前移除
life.removeListener('求安慰' ,water)
//移除所有事件
// life.removeAllListeners()
// life.removeAllListeners('求安慰')

life.emit('求安慰','汉子')
// 还可以打印有多少个时间监听器（两种方法）
console.log(life.listeners('求安慰').length)
console.log(EventEmitter.listenerCount(life, '求安慰'))

