
module.exports = {
	add: async function(req, res, next){
		try {
			const user = {
				userName: req.param('userName'),
				password: req.param('password'),
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
				roles: [await SEC_Role.findOne({name: 'Student'})]
			};
			const student = {
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
				document: req.param('document'),
				address: req.param('address'),
				user: user
			};
			let data = await GEN_Student.create(student);
			if(data){
				SEC_FlashService.success(req, 'Student Created Successfully!');
				return res.redirect('/listStudents');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newStudent');
		}
	},
	update: async function(req, res, next){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listStudents');
		}
		try {
			let data = await GEN_Student.update(id, {
				name: req.param('name'),
				lastName: req.param('lastName'),
				phone: req.param('phone'),
				email: req.param('email'),
				document: req.param('document'),
				address: req.param('address'),
			});
			if(data){
				SEC_FlashService.success(req, 'Student Updated Successfully!');
				return res.redirect('/listStudents');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editStudent/'+id);
		}	
	},
	delete: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listStudents');
		}
		try {
			await GEN_Student.destroy(id);
			SEC_FlashService.success(req, 'Student deleted Successfully!');
			return res.redirect('/listStudents');
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listStudents');
		}
	}
};

