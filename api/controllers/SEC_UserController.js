/**
 * SEC_UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: async function(req, res, next){
		try {
			let roles = req.param('roles');
			if(!roles){
				roles = [];
			}
			const u = {
				userName: req.param('userName'),
				password: req.param('password'),
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
				roles: roles
			};
			let data = await SEC_User.create(u);
			if(data){
				SEC_FlashService.success(req, 'User Created Successfully!');
				return res.redirect('/listUsers');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newUser');
		}
	},
	update: async function(req, res, next){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listUsers');
		}
		try {
			let roles = req.param('roles');
			if(!roles){
				roles = [];
			}
			let data = await SEC_User.update(id, {
				userName: req.param('userName'),
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
				roles: roles
			});
			if(data){
				SEC_FlashService.success(req, 'User Updated Successfully!');
				return res.redirect('/listUsers');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editUser/'+id);
		}		
	}
};

