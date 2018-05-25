/**
 * SEC_PermissionController
 *
 * @description :: Server-side logic for managing permissions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: async function(req, res){
		try {
			const x = {
				id: req.param('newId'),
				name: req.param('name'),
				description: req.param('description')
			};
			let data = await SEC_Permission.create(x);
			if(data){
				SEC_FlashService.success(req, 'Permission Created Successfully!');
				return res.redirect('/listPermissions');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newPermission');
		}
	},
	update: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listPermissions');
		}
		try {
			const x = {
				name: req.param('name'),
				description: req.param('description')
			};
			let data = await SEC_Permission.update(id, x);
			if(data){
				SEC_FlashService.success(req, 'Permission Updated Successfully!');
				return res.redirect('/listPermissions');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editPermission/'+id);
		}
	},
	delete: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listPermissions');
		}
		try {
			await SEC_Permission.destroy(id);
			SEC_FlashService.success(req, 'Permission deleted Successfully!');
			return res.redirect('/listPermissions');
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listPermissions');
		}
	}
};

