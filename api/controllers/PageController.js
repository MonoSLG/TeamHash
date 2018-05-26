/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res, next){
		return res.view('index');
	},
	login: async function(req, res, next){		
		return res.view('login');
	},
	register: async function(req, res, next){
		try {
			const data = await SEC_Role.find();
			return res.view('App/SEC_User/newUser', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	}
};

