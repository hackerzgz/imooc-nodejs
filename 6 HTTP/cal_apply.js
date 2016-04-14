var pet = {
    words:'...',
    speak:function (say) {
        console.log(say + ' ' + this.words)
    }
}

// pet.speak('Speak')
// 打印结果：Speak ...


var dog = {
    words :'Wang',
}

// call函数传递参数的数组
// 通过call可以改变上下文
// 原本 pet.speak 函数的this指针是指向pet的
// 通过call就把this指针指向dog
// 也就是说：call方法可以将this指针指向第一个形参
pet.speak.call(dog ,'Speak')
// 打印结果：Speak Wang