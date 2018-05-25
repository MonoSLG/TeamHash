/**
 * SEC_Menu.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		text: {
			type: 'string',
			required: true
		},
		link: {
			type: 'string',
			required: true,
			unique: false
		},
		showInNav: {
			type: 'boolean',
			required: true,
		},
		requiredPermissions: {
			collection: 'sec_permission',
			 via: 'menus',
			 dominant: true,
			 defaultsTo: []
		},
		isRootMenu: {
			type: 'boolean',
			required: true,
		},
		fatherMenu: {
			model: 'sec_menu'
		},
		sonsMenus: {
			collection: 'sec_menu',
			via: 'fatherMenu'
		},
		enabled: {
			type: 'boolean',
			required: true
		},
		order: {
			type: 'integer',
			defaultsTo: 0
		},
		icon: {
			type: 'string',
			defaultsTo: ""
		},
		toJSON: function() {
			let obj = this.toObject();
			delete obj.createdAt;
			delete obj.updatedAt;
			return obj;
		}
	}
};
