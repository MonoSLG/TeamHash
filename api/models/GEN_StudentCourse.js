
module.exports = {
	attributes: {
		student: {
			model: 'gen_student'
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