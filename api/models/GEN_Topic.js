
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
<<<<<<< HEAD
            collection: 'gen_homework',
            via: 'topic'
=======
            collection: 'gen_homework'
            //posiblemente falte via
>>>>>>> e7452111d69184818f9bace2168635e364c40662
        },
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};
