
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
=======
<<<<<<< HEAD
>>>>>>> e7452111d69184818f9bace2168635e364c40662
        grade:{
            type: 'integer',
			required: true
        },
        achievement: {
			type: 'string',
			required: false
<<<<<<< HEAD
=======
=======
        achievement: {
            type: 'string',
            required: false
>>>>>>> ff46c65191565c3b9a6ecc76803b9d392115f0f6
>>>>>>> e7452111d69184818f9bace2168635e364c40662
        },
        topic:{
            model: 'gen_topic'
        },
<<<<<<< HEAD
        courses: {
			collection: 'gen_course',
			via: 'course',
			through: 'gen_coursehomework'
		},
=======
>>>>>>> e7452111d69184818f9bace2168635e364c40662
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
<<<<<<< HEAD
};
=======
};
>>>>>>> ff46c65191565c3b9a6ecc76803b9d392115f0f6
>>>>>>> e7452111d69184818f9bace2168635e364c40662
