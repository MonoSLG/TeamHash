
module.exports = {
	attributes: {
		teacherSubject: {
			model: 'gen_teachersubject'
		},
		course: {
			model: 'gen_course'
		},
		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};