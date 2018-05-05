module.exports = {
	add: async function(req, res, next){
		try {
			const u = {
				name: req.param('name'),
				code: req.param('code'),
				description: req.param('description')
			};
			let data = await GEN_Subject.create(u);
			if(data){
				SEC_FlashService.success(req, 'Subject Created Successfully!');
				return res.redirect('/listSubjects');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newSubject');
		}
	},
	update: async function(req, res, next){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listSubjects');
		}
		try {
			let data = await GEN_Subject.update(id, {
				name: req.param('name'),
				code: req.param('code'),
				description: req.param('description')
			});
			if(data){
				SEC_FlashService.success(req, 'Subject Updated Successfully!');
				return res.redirect('/listSubjects');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editSubject/'+id);
		}	
	},
	delete: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listSubjects');
		}
		try {
			await GEN_Subject.destroy(id);
			SEC_FlashService.success(req, 'Subject deleted Successfully!');
			return res.redirect('/listSubjects');
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listSubjects');
		}
	}
};