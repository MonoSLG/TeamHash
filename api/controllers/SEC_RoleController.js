/**
 * SEC_RolController
 *
 * @description :: Server-side logic for managing rols
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: async function(req, res){
		try {
			let permissions = req.param('permissions');
			if(!permissions){
				permissions = [];
			}
			const x = {
				name: req.param('name'),
				permissions: permissions
			};
			let data = await SEC_Role.create(x);
			if(data){
				SEC_FlashService.success(req, 'Role Created Successfully!');
				return res.redirect('/listRoles');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newRole');
		}
	},
	update: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listRoles');
		}
		try {
			let permissions = req.param('permissions');
			if(!permissions){
				permissions = [];
			}
			const x = {
				name: req.param('name'),
				permissions: permissions
			};
			let data = await SEC_Role.update(id, x);
			if(data){
				SEC_FlashService.success(req, 'Role Updated Successfully!');
				return res.redirect('/listRoles');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editRole/'+id);
		}
	}
};

