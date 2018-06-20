module.exports = {
	get: async function(req, res, next){
		try {
			let subjectId = req.param('subjectId');
			if(!subjectId){
				let data = await GEN_Topic.find();
				return res.json(data);
			}else{
				let data = await GEN_Topic.find({subject: subjectId});
				return res.json(data);
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listSubjects');
		}
	},
	add: async function(req, res, next){
		try {
			const u = {
				title: req.param('title'),
				description: req.param('description'),
				subject: req.param('subject')
			};
			let data = await GEN_Topic.create(u);
			if(data){
				SEC_FlashService.success(req, 'Topic Created Successfully!');
				return res.redirect('/listTopics');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newTopic');
		}
	},
	update: async function(req, res, next){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listTopics');
		}
		try {
			let data = await GEN_Topic.update(id, {
				title: req.param('title'),
				description: req.param('description'),
				subject: req.param('subject')
			});
			if(data){
				SEC_FlashService.success(req, 'Topic Updated Successfully!');
				return res.redirect('/listTopics');
			}
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editTopic/'+id);
		}	
	},
	delete: async function(req, res){
		const id = req.param('id');
		if(!id){
			return res.redirect('/listTopics');
		}
		try {
			await GEN_Course.destroy(id);
			SEC_FlashService.success(req, 'Topic deleted Successfully!');
			return res.redirect('/listTopics');
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listTopics');
		}
	}
};

