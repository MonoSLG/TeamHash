
module.exports = {
	attributes: {
		question: {
			type: 'string',
			required: true
		},
		answers: {
			type: 'array',
			required: true
		},
		correctAnswer: {
			type: 'integer',
			required: true
		},
		phase: {
			type: 'integer',
			required: true
		}, 
		grade: {
			type: 'integer',
			required: true
		}, 
		subject: {
            model: 'gen_subject',
        },
		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};