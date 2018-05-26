
module.exports = {
	attributes: {
		name: {
			type: 'string',
			required: true
		},
		code: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string',
			required: false
		},
		teachers: {
			collection: 'gen_teacher',
			via: 'teacher',
			through: 'gen_teachersubject'
		},
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};