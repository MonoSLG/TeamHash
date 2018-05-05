
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
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};