
module.exports = {
	attributes: {
		grade: {
			type: 'integer',
			required: true
		},
		letter: {
			type: 'string',
			required: true
		},
		year: {
			type: 'integer',
			required: true
		},
		homeworks: {
			collecion: 'gen_homework',
			via: 'courses',
		},

		toJSON: function () {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};