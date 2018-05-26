
module.exports = {
	attributes: {
		teacher: {
			model: 'gen_teacher'
		},
		subject: {
			model: 'gen_subject'
		},
		courses: {
			collection: 'gen_courses',
			via: 'course',
			through: 'gen_teachersubjectcourse'
		},
		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};