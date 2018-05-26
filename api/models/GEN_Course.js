
module.exports = {
	attributes: {
		grade: {
			type: 'string',
			required: true
		},
		letter: {
			type: 'string',
			required: true
		},
		year: {
			type: 'string',
			required: true
		},
		homeworks: {
			collection: 'gen_homework',
			via: 'homework',
			through: 'gen_coursehomework'
		},
		teachersubjects: {
			collection: 'gen_teachersubject',
			via: 'teachersubject',
			through: 'gen_teachersubjectcourse'
		},
		students: {
			collection: 'gen_student',
			via: 'student',
			through: 'gen_studentcourse'
		},
		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};