
module.exports = {
	attributes: {
		actualQuestion: {
			type: 'string',
			required: true
		},
		questions: {
			collection: 'gen_question',
			via: 'question'
		},
		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};