
var klass = require('./klass')

klass.add('HackerA' ,['白富美' ,'高富帅'])



// 添加班级接口
exports.add = function(klass) {
    klasses.forEach(function(item,index){
        var _klass = item
        var teacherName = item.teacherName
        var students= item.students

        klass.add(teacherName, students)
    })
}

