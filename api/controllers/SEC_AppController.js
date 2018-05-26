/**
 * SEC_AppController
 *
 * @description :: Server-side logic for managing Sec_apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//
	//------------------------------------------INDEX-------------------------------------
	//
	indexApp: async function(req, res){
		return res.view('App/index');
	},
	//
	//---------------------------------------PERMISSIONS----------------------------------
	//
	newPermission: async function(req, res, next){
		return res.view('App/SEC_Permission/newPermission');
	},
	listPermissions: async function(req, res, next){
		try {
			const data = await SEC_Permission.find();
			return res.view('App/SEC_Permission/listPermissions', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	editPermission: async function(req, res, next){
		try {
			const id = req.param('id');
			const data = await SEC_Permission.findOne(id);
			return res.view('App/SEC_Permission/editPermission', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//
	//-------------------------------------------MENUS------------------------------------
	//
	newMenu: async function(req, res, next){
		try {
			const dataPermissions = await SEC_Permission.find();
			const dataMenus = await SEC_Menu.find();
			return res.view('App/SEC_Menu/newMenu', {dataPermissions: dataPermissions, dataMenus: dataMenus});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	listMenus: async function(req, res, next){
		try {
			const data = await  SEC_Menu.find().populate('requiredPermissions').populate('fatherMenu');
			return res.view('App/SEC_Menu/listMenus', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	editMenu: async function(req, res, next){
		try {
			const id = req.param('id');
			let dataPermissions = await SEC_Permission.find();
			let dataMenu = await SEC_Menu.findOne(id).populate('requiredPermissions');
			let dataMenus = await SEC_Menu.find();
			return res.view('App/SEC_Menu/editMenu', {dataMenus: dataMenus, dataMenu: dataMenu, dataPermissions: dataPermissions});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//
	//-------------------------------------------ROLES------------------------------------
	//
	newRole: async function(req, res, next){
		try {
			const data = await SEC_Permission.find();
			return res.view('App/SEC_Role/newRole', {data:data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	listRoles: async function(req, res, next){
		try {
			const data = await SEC_Role.find().populate('permissions');
			return res.view('App/SEC_Role/listRoles', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	editRole: async function(req, res, next){
		try {
			const id = req.param('id');
			const dataRole = await SEC_Role.findOne(id).populate('permissions');
			const dataPermissions = await SEC_Permission.find();
			return res.view('App/SEC_Role/editRole', {dataRole: dataRole, dataPermissions: dataPermissions});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//
	//-------------------------------------------USERS------------------------------------
	//
	newUser: async function(req, res, next){
		try {
			const data = await SEC_Role.find();
			return res.view('App/SEC_User/newUser', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	listUsers: async function(req, res, next){
		try {
			const data = await SEC_User.find().populate("roles");
			return res.view('App/SEC_User/listUsers', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	editUser: async function(req, res, next){
		try {
			const id = req.param('id');
			const dataUser = await SEC_User.findOne(id).populate('roles');
			const dataRoles = await SEC_Role.find();
			return res.view('App/SEC_User/editUser', {dataUser: dataUser, dataRoles: dataRoles});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	}
};

