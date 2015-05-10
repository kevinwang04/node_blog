var student = require('./student')
var teacher = require('./teacher')

teacher.add('shangxiaowei')

function add(teachName,students){
	teacher.add(teachName)
	students.forEach(function(item,index){
		student.add(item)
	})
}
exports.add = add
