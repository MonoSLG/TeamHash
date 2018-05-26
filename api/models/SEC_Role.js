/**
 * SEC_Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		required: true,
      unique: true
  	},
  	permissions: {
  		collection: 'sec_permission',
  		via: 'roles',
  		dominant: true
  	},
    users: {
      collection: 'sec_user',
      via: 'roles'
    },
    toJSON: function() {
      let obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  }
};

