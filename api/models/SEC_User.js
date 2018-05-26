/**
 * SEC_User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

attributes: {
	userName: {
		type: 'string',
		required: true,
		unique: true
	},
	password: {
		type: 'string',
		required: true
	},
	name: {
		type: 'string',
		required: true
	},
	lastName: {
		type: 'string'
	},
	phone: {
		type: 'string'
	},
	email: {
		type: 'email'
	},
	roles: {
	  collection: 'sec_role',
	  via: 'users',
	  dominant: true,
	  defaultsTo: []
	},
	toJSON: function() {
		let obj = this.toObject();
		delete obj.password;
		delete obj.createdAt;
		delete obj.updatedAt;
		return obj;
	}
},

beforeCreate: function (values, next) {
	const bcrypt = require('bcrypt');
	const saltRounds = 10;
	const plainTextPassword = values.password;

	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(plainTextPassword, salt, function(err, hash) {
			values.password = hash;
			next();
		});
	});
}




};

