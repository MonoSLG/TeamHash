
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
		topics: {
			collection: 'gen_topic',
			via: 'subject',
			dominant: true,
			defaultsTo: []
		},
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};