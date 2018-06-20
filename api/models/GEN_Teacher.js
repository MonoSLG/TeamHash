
module.exports = {
	attributes: {
		name: {
			type: 'string',
			required: true
		},
		lastName: {
			type: 'string',
			required: true
		},
		phone: {
			type: 'string'
		},
		email: {
			type: 'email',
			required: true,
		},
		subjects: {
			collection: 'gen_subject',
			via: 'subject',
			through: 'gen_teachersubject'
		},
		user: {
			model: 'sec_user'
		},
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};
