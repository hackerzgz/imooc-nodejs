// this指向函数的拥有者
    // 1. 只能在函数中调用

// 1.
// var pet = {
//     words:'...',
//     speak:function() {
//         console.log(this.words)
//         console.log(this === pet)
//     }
// }

// pet.speak()

// 2.
// function pet (words) {
//     this.words = words

//     console.log(this.words)
//     console.log(this === global)
//         // this指向了顶层的GLOBAL对象
// }

// pet('...')

// 3.
function Pet (words) {
    this.words = words
    this.speak = function () {
        console.log(this.words)
        console.log(this)
            // this指向了cat对象
    }
}


var cat = new Pet('Miao')

cat.speak()