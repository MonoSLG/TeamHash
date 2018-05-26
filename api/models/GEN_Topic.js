
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
        subject: {
            model: 'gen_subject',
        },
        homeworks:{
            collection: 'gen_homework'
            //posiblemente falte via
        },
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};
