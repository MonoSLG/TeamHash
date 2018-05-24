/**
 * GEN_Homework.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
			type: 'string',
			required: true
    },
    description: {
			type: 'string',
			required: true
    },
    state: {
			type: 'number',
			required: true
    },
    grade: {
			type: 'integer',
			required: true
    },
    topic: {
			model: 'gen_topic',
			required: true
	},
    achievement: {
		type: 'string',
		required: false
	},
	teacher: {
		model: 'gen_teacher',
		required: true
	},
	courses: {
		collection: 'gen_course',
		via: 'homeworks',
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

