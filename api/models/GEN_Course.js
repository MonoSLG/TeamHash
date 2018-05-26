
module.exports = {
	attributes: {
		grade: {
<<<<<<< HEAD
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
=======
			type: 'integer',
			required: true
		},
		letter: {
			type: 'string',
			required: true
		},
		year: {
			type: 'integer',
			required: true
		},
		homeworks: {
			collecion: 'gen_homework',
			via: 'courses',
		},

>>>>>>> e7452111d69184818f9bace2168635e364c40662
		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};