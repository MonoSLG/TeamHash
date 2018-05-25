/**
 * SEC_SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const bcrypt = require('bcrypt');

module.exports = {
	login: async function(req, res, next){
		try {
			const userName = req.param('userName');
			const plainTextPassword = req.param('password');
			const x = {
				userName: userName
			}
			const dataUser = await SEC_User.findOne(x).populate('roles', {select: 'id'});
			if(dataUser){
				const validPassword = await bcrypt.compare(plainTextPassword, dataUser.password);
				if(validPassword){
					req.session.userId = dataUser.id;
					req.session.authenticated = true;
					return res.redirect('/indexApp');
				}else{
					SEC_FlashService.error(req, 'Incorrect Credentials!');
					return res.redirect('/login');
				}				
			}else{
				SEC_FlashService.error(req, 'Incorrect Credentials!');
				return res.redirect('/login');
			}
		}catch (err){
			SEC_FlashService.error(req, err.message);
			return res.redirect('/login');
		}
	},
	logout: async function(req, res){
		try {
			await req.session.destroy();
			return res.redirect('/');
		}catch (err){
			SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	}
};

