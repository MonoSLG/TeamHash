
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
<<<<<<< HEAD
        grade:{
            type: 'integer',
			required: true
        },
        achievement: {
			type: 'string',
			required: false
=======
        achievement: {
            type: 'string',
            required: false
>>>>>>> ff46c65191565c3b9a6ecc76803b9d392115f0f6
        },
        topic:{
            model: 'gen_topic'
        },
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
<<<<<<< HEAD
};
=======
};
>>>>>>> ff46c65191565c3b9a6ecc76803b9d392115f0f6
