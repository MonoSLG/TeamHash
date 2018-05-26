
module.exports = {
	attributes: {
		title: {
			type: 'string',
			required: true
        },
        description: {
			type: 'string',
			required: false
        },
        grade:{
            type: 'integer',
			required: true
        },
        achievement: {
			type: 'string',
			required: false
        },
        topic:{
            model: 'gen_topic'
        },
        courses: {
			collection: 'gen_course',
			via: 'course',
			through: 'gen_coursehomework'
		},
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};