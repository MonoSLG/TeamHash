
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
<<<<<<< HEAD
		teachers: {
			collection: 'gen_teacher',
			via: 'teacher',
			through: 'gen_teachersubject'
=======
		topics: {
			collection: 'gen_topic',
			via: 'subject',
			dominant: true,
			defaultsTo: []
>>>>>>> e7452111d69184818f9bace2168635e364c40662
		},
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};