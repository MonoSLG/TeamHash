module.exports = {
	add: async function(req, res, next){
		try {
			const u = {
				grade: req.param('grade'),
				letter: req.param('letter'),
				year: req.param('year')
			};
			let data = await GEN_Course.create(u);
			if(data){
				SEC_FlashService.success(req, 'Course Created Successfully!');
				return res.redirect('/listCourses');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newCourse');
		}
	},
	update: async function(req, res, next){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listCourses');
		}
		try {
			let data = await GEN_Course.update(id, {
				grade: req.param('grade'),
				letter: req.param('letter'),
				year: req.param('year')
			});
			if(data){
				SEC_FlashService.success(req, 'Course Updated Successfully!');
				return res.redirect('/listCourses');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editCourse/'+id);
		}	
	},
	delete: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listCourses');
		}
		try {
			await GEN_Course.destroy(id);
			SEC_FlashService.success(req, 'Course deleted Successfully!');
			return res.redirect('/listCourses');
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listCourses');
		}
	}
};

