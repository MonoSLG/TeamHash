/**
 * SEC_MenuController
 *
 * @description :: Server-side logic for managing menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	add: async function(req, res){
		try {
			let show = req.param('show');
			if(!show){
				show = false;
			}
			let enabled = req.param('enabled');
			if(!enabled){
				enabled = false;
			}
			let fatherMenu = req.param('fatherMenu');
			let isRootMenu = false;
			if(fatherMenu == 'nav'){
				isRootMenu = true;
			}
			let requiredPermissions = req.param('requiredPermissions');
			if(!requiredPermissions){
				requiredPermissions = [];
			}
			const x = {
				text: req.param('text'),
				link: req.param('link'),
				showInNav: show,
				requiredPermissions: requiredPermissions,
				isRootMenu: isRootMenu,
				enabled: enabled,
				order: req.param('order'),
				icon: req.param('icon')
			};
			if(!isRootMenu){
				x.fatherMenu = fatherMenu;
			}
			let data = await SEC_Menu.create(x);
			if(data){
				SEC_FlashService.success(req, 'Menu Created Successfully!');
				return res.redirect('/listMenus');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newMenu');
		}
	},
	update: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listMenus');
		}
		try {
			let show = req.param('show');
			if(!show){
				show = false;
			}
			let enabled = req.param('enabled');
			if(!enabled){
				enabled = false;
			}
			let isRootMenu = false;
			let fatherMenu = req.param('fatherMenu');
			if(fatherMenu == 'nav'){
				isRootMenu = true;
			}
			let requiredPermissions = req.param('requiredPermissions');
			if(!requiredPermissions){
				requiredPermissions = [];
			}
			const x = {
				text: req.param('text'),
				link: req.param('link'),
				showInNav: show,
				requiredPermissions: requiredPermissions,
				isRootMenu: isRootMenu,
				enabled: enabled,
				order: req.param('order'),
				icon: req.param('icon')
			};
			if(!isRootMenu){
				x.fatherMenu = fatherMenu;
			}else{
				x.fatherMenu = undefined;
			}
			let data = await SEC_Menu.update(id, x);
			if(data){
				SEC_FlashService.success(req, 'Menu Updated Successfully!');
				return res.redirect('/listMenus');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editMenu/'+id);
		}
	},
	delete: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listMenus');
		}
		try {
			await SEC_Menu.destroy(id);
			SEC_FlashService.success(req, 'Menu deleted Successfully!');
			return res.redirect('/listMenus');
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listMenus');
		}
	}
};
