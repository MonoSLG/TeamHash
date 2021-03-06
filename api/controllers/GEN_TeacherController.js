
module.exports = {
	add: async function(req, res, next){
		try {
			let rol = await SEC_Role.findOne({name: 'Teacher'});
			if(!rol){
				await SEC_FlashService.error(req, 'No se encuentra el rol "Teacher", Por favor crearlo!');
				return res.redirect('/newTeacher');
			}
			const user = {
				userName: req.param('userName'),
				password: req.param('password'),
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
				roles: [rol]
			};
			const teacher = {
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
				user: user
			};
			let data = await GEN_Teacher.create(teacher);
			if(data){
				SEC_FlashService.success(req, 'Teacher Created Successfully!');
				return res.redirect('/listTeachers');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newTeacher');
		}
	},
	update: async function(req, res, next){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listTeachers');
		}
		try {
			let data = await GEN_Teacher.update(id, {
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
			});
			if(data){
				SEC_FlashService.success(req, 'Teacher Updated Successfully!');
				return res.redirect('/listTeachers');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editTeacher/'+id);
		}	
	},
	delete: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listTeachers');
		}
		try {
			await GEN_Teacher.destroy(id);
			SEC_FlashService.success(req, 'Teacher deleted Successfully!');
			return res.redirect('/listTeachers');
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listTeachers');
		}
	}
};

