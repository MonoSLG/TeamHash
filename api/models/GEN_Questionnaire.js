
module.exports = {
	attributes: {
		student: {
			type: 'string',
			required: true
		},
		questions: {
			type: 'Array',
		},
		date: {
			type: 'string',
			required: true
		},
		score: {
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