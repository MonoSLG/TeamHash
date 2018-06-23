// SEC_SecurityService.js

const Enumerable = require('linq');

module.exports = {
	loadAllowedMenus: loadAllowedMenus,
	verifyPermissionsToPath: verifyPermissionsToPath,
	userHasPermission: userHasPermission,
	createSuperUser: createSuperUser,
	loadInfoSession: loadInfoSession
}

async function loadInfoSession(req, res){
	try {
		res.locals.user = await SEC_User.findOne(req.session.userId).populate('roles', {select: 'id'});
		res.locals.allowedMenus = await loadAllowedMenus(res);
	}catch (err){
		await SEC_FlashService.error(req, err.message);
		return res.redirect('/');
	}
}

async function loadAllowedMenus(res){
	let data = await SEC_Menu.find()
	.populate('requiredPermissions', {select: 'id'})
	.populate('sonsMenus', {sort: 'order ASC'})
	.sort('order ASC');

	let arrayUserPermissions = await getArrayOfPermissionsOfUserInSession(res);
	let allowedMenus = [];

	for(let i=0, len=data.length; i < len; i++) {
		let menu = data[i];
		if(userInSessionHasPermissionsTo(menu, arrayUserPermissions)){
			let sonsToDelete = [];
			
			for(let j=0, len2=menu.sonsMenus.length; j < len2; j++) {
				let son = await SEC_Menu.findOne(menu.sonsMenus[j].id).populate('requiredPermissions', {select: 'id'});
				if(!userInSessionHasPermissionsTo(son, arrayUserPermissions)){
					sonsToDelete.push(son.id);
				}
			}

			while(sonsToDelete.length > 0){
				for(let k=0; k<menu.sonsMenus.length;k++){
					let son = menu.sonsMenus[k];
					if(sonsToDelete.length > 0 && son.id == sonsToDelete[0]){
						sonsToDelete.splice(0, 1);
						menu.sonsMenus.splice(k, 1);
					}
				}
			}


			allowedMenus.push(menu);
		}
	}
	return allowedMenus;
}

async function getArrayOfPermissionsOfUserInSession(res){
	let user = res.locals.user;
	let roles = Enumerable.from(user.roles).select("x => x.id").toArray();
	let permissions = [];
	for(let i=0, len = roles.length; i < len; i++) {
		let data = await SEC_Role.findOne(roles[i]).populate('permissions', {select: 'id'});
		let permissionsTemp = Enumerable.from(data.permissions).select("x => x.id").toArray();
		for(let j=0, len2 = permissionsTemp.length; j < len2; j++) {
			if(permissions.indexOf(permissionsTemp[j]) <0 ){
				permissions.push(permissionsTemp[j]);
			}
		}		
	}
	return permissions;
}

function userInSessionHasPermissionsTo(menu, arrayUserPermissions){
	if(!menu.enabled){
		return false;
	}
	if(!menu.requiredPermissions || menu.requiredPermissions.length==0){
		return true;
	}
	if(!arrayUserPermissions){
		return false;
	}
	for(let i=0, len = menu.requiredPermissions.length; i < len; i++) {
		if(arrayUserPermissions.indexOf(menu.requiredPermissions[i].id) < 0){
			return false;
		}
	};
	//console.log(menu.id + ' - ' + menu.text)
	return true;
}

function verifyPermissionsToPath(res, path) {
	let allowedMenus = res.locals.allowedMenus;
	for(let i=0, len = allowedMenus.length; i < len; i++) {
		let linkAllowedMenu = allowedMenus[i].link;

		let splitPath = path.split('/');
		let splitLinkAllowedMenu = linkAllowedMenu.split('/');

		if(splitPath.length == splitLinkAllowedMenu.length){
			let allMatchs = true;
			for(let j=0, len=splitPath.length; j < len && allMatchs; j++) {
				if(splitLinkAllowedMenu[j] != '::' && splitLinkAllowedMenu[j] != splitPath[j]){
					allMatchs = false;
				}
			}
			if(allMatchs){
				if(allowedMenus[i].enabled){
					return true;
				}
				return false;
			}
		}
	}
	return false;
}

function userHasPermission(res, idPermission){
	let permissions = getArrayOfPermissionsOfUserInSession(res)
	if(permissions.indexOf(idPermission) < 0 ){
		return false;
	}
	return true;
}



async function createSuperUser(){
	//
	//---------PERMISSIONS-------
	//
	let x = {
		id: 1,
		name: 'SEC_Admin_Permissions',
		description: 'Permission To Manage Permissions'
	};
	let permissionPermissions = await SEC_Permission.create(x);
	x = {
		id: 2,
		name: 'SEC_Admin_Roles',
		description: 'Permission To Manage Roles'
	};
	let permissionRoles = await SEC_Permission.create(x);
	x = {
		id: 3,
		name: 'SEC_Admin_Menus',
		description: 'Permission To Manage Menus'
	};
	let permissionMenus = await SEC_Permission.create(x);
	x = {
		id: 4,
		name: 'SEC_Admin_Users',
		description: 'Permission To Manage Users'
	};
	let permissionUsers = await SEC_Permission.create(x);
	//
	//------------MENUS----------
	//
	await createMenu('Home', '/indexApp', true, [], true, null, true, 0, "glyphicon glyphicon-home");
	//
	//(text, link, showInNav, permissions, isRootMenu, fatherMenu, enabled, order, icon)
	let per = [permissionPermissions.id, permissionRoles.id, permissionMenus.id, permissionUsers.id];
	let menuSecurity = await createMenu('Security', '/#', true, per, true, null, true, 1, "glyphicon glyphicon-lock");
	//
	//------------LIST----------
	await createMenu('List Permissions', '/listPermissions', true, [permissionPermissions.id], false, menuSecurity.id, true, 1, "glyphicon glyphicon-th-list");
	await createMenu('List Menus', '/listMenus', true, [permissionMenus.id], false, menuSecurity.id, true, 2, "glyphicon glyphicon-th-list");
	await createMenu('List Roles', '/listRoles', true, [permissionRoles.id], false, menuSecurity.id, true, 3, "glyphicon glyphicon-th-list");
	await createMenu('List Users', '/listUsers', true, [permissionUsers.id], false, menuSecurity.id, true, 4, "glyphicon glyphicon-th-list");
	//-------------NEW----------
	await createMenu('New Permission', '/newPermission', true, [permissionPermissions.id], false, menuSecurity.id, true, 5, "glyphicon glyphicon-pencil");
	await createMenu('New Menu', '/newMenu', true, [permissionMenus.id], false, menuSecurity.id, true, 6, "glyphicon glyphicon-pencil");
	await createMenu('New Role', '/newRole', true, [permissionRoles.id], false, menuSecurity.id, true, 7, "glyphicon glyphicon-pencil");
	await createMenu('New User', '/newUser', true, [permissionUsers.id], false, menuSecurity.id, true, 8, "glyphicon glyphicon-pencil");
	//-----------EDIT VIEW------
	await createMenu('Edit Permission', '/editPermission/::', false, [permissionPermissions.id], false, menuSecurity.id, true, null, null);
	await createMenu('Edit Menu', '/editMenu/::', false, [permissionMenus.id], false, menuSecurity.id, true, null, null);
	await createMenu('Edit Role', '/editRole/::', false, [permissionRoles.id], false, menuSecurity.id, true, null, null);
	await createMenu('Edit User', '/editUser/::', false, [permissionUsers.id], false, menuSecurity.id, true, null, null);
	//--------------WS------
	await createMenu('Add Permission', '/sec_permission/add', false, [permissionPermissions.id], false, menuSecurity.id, true, null, null);
	await createMenu('Update Permission', '/sec_permission/update/::', false, [permissionPermissions.id], false, menuSecurity.id, true, null, null);
	await createMenu('Delete Permission', '/sec_permission/delete/::', false, [permissionPermissions.id], false, menuSecurity.id, true, null, null);
	//
	await createMenu('Add Menu', '/sec_menu/add', false, [permissionMenus.id], false, menuSecurity.id, true, null, null);
	await createMenu('Update Menu', '/sec_menu/update/::', false, [permissionMenus.id], false, menuSecurity.id, true, null, null);
	await createMenu('Delete Menu', '/sec_menu/delete/::', false, [permissionMenus.id], false, menuSecurity.id, true, null, null);
	//
	await createMenu('Add Role', '/sec_role/add', false, [permissionRoles.id], false, menuSecurity.id, true, null, null);
	await createMenu('Update Role', '/sec_role/update/::', false, [permissionRoles.id], false, menuSecurity.id, true, null, null);
	await createMenu('Delete Role', '/sec_role/delete/::', false, [permissionRoles.id], false, menuSecurity.id, true, null, null);
	//
	await createMenu('Add User', '/sec_user/add', false, [permissionUsers.id], false, menuSecurity.id, true, null, null);
	await createMenu('Update User', '/sec_user/update/::', false, [permissionUsers.id], false, menuSecurity.id, true, null, null);
	//
	//------------ROLE-----------
	//
	x = {
		name: '--SuperUserRole--',
		permissions: [permissionPermissions.id, permissionRoles.id, permissionMenus.id, permissionUsers.id]
	};
	let role = await SEC_Role.create(x);
	//
	//------------USER-----------
	//
	x = {
		userName: 'superUser',
		password: 'user951',
		name: 'Super',
		lastName: 'User',
		phone: '123',
		email: 'email@email.com',
		roles: [role.id]
	};
	let user = await SEC_User.create(x);
	console.log(user);
	console.log('===Super User Created===');
}


async function createMenu(text, link, showInNav, permissions, isRootMenu, fatherMenu, enabled, order, icon){
	x = {
		text: text,
		link: link,
		showInNav: showInNav,
		requiredPermissions: permissions,
		isRootMenu: isRootMenu,
		fatherMenu: fatherMenu,
		enabled: enabled,
		order: order,
		icon: icon
	};
	let menu = await SEC_Menu.create(x);
	return menu;
}