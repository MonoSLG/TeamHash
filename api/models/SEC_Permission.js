/**
 * SEC_Permission.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		id: {
			type: 'integer',
			autoIncrement: false,
			unique: true,
			primaryKey: true
		},
		name: {
			type: 'string',
			required: true,
			unique: true
		},
		description: {
			type: 'string'
		},
		menus: {
			collection: 'sec_menu',
			via: 'requiredPermissions'
		},
		roles: {
			collection: 'sec_role',
			via: 'permissions'
		},
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}

	}

};

