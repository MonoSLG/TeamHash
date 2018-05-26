
module.exports = {
	attributes: {
		course: {
			model: 'gen_course'
		},
		homework: {
			model: 'gen_homework'
		},
		startDate: {
			type: 'string',
			required: true
		},
		endDate: {
			type: 'string',
			required: true
		},
		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};