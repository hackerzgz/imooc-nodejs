
// 通过require方法引入相关脚本
var student = require('./student')
var teacher = require('./teacher')

// 通过引入的脚本添加一个名叫 HackerZ 的教师
teacher.add('HackerZ')

function add(teacherName ,students){
    teacher.add(teacherName)

// item为传入的学生名字，index为传入的序号
// 【注意】forEach方法使用 . 方法调用，而不是 = 号
    students.forEach(function(item ,index){
        student.add(item)
    })
}

// 使模块变成一个传统的模块实例，使用exports
exports.add = add

// 使模块变成一个特别的对象类型，就要使用module
// module.exports = add

