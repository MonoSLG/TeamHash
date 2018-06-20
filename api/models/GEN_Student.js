
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
			required: false,
		},
		document: {
			type: 'string',
			required: true,
		},
		address: {
			type: 'string',
			required: true,
		},
		courses: {
			collection: 'gen_course',
			via: 'course',
			through: 'gen_studentcourse'
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
