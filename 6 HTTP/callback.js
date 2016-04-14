function learn(something) {
    console.log(something)
}

function we(callback ,something){
    something += ' is cool'
    callback(something)
}

we(learn, 'Nodejs')

// 匿名函数
we(function(something) {
    console.log(something)
} ,'HackerZ')