/**
 * GEN_Topic.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string',
			required: true
		},
		subject: {
			model: 'gen_subject',
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

