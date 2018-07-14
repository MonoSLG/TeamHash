module.exports = {
	get: async function(req, res, next){
		try {
			let grade = req.param('grade');
			let data = [];
			if(!grade){
				data = await GEN_Homework.find().populate('topic');
			}else{
				data = await GEN_Homework.find({grade: grade}).populate('topic');
			}
			for (let i=0; i<data.length; i++){
				const item = data[i]
				const subject = await GEN_Subject.findOne(item.topic.subject);
				data[i]['subject'] = subject;
			}
			return res.json(data);
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listHomeworks');
		}
	},
	create: async function (req, res, next) {
		try {
			const homework_temp = {
				title: req.param('title'),
				description: req.param('description'),
				grade: req.param('grade'),
				achievement: req.param('achievement'),
				topic: req.param('topic'),
				//subject: req.param('subject'),
			};
			let data = await GEN_Homework.create(homework_temp);
			if (data) {
				SEC_FlashService.success(req, 'Homework Created Successfully!');
				return res.redirect('/listHomeworks');
			}
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newHomework');
		}
	},
	assign: async function (req, res, next) {
		try {
			const dataTemp = {
				homework: req.param('homework'),
				course: req.param('course'),
				startDate: req.param('startDate'),
				endDate: req.param('endDate'),
			};
			let date1 = new Date(dataTemp.startDate);
			let date2 = new Date(dataTemp.endDate);
			let today = new Date();


			let courseHomework = await GEN_CourseHomework.findOne({course: dataTemp.course, homework: dataTemp.homework});
			
			if(courseHomework){
				await SEC_FlashService.error(req, 'La tarea ya ha sido asignada a este curso!');
				return res.redirect('/assignHomework');
			}

			if(date1 > date2){
				await SEC_FlashService.error(req, 'La fecha de inicio no puede ser mayor a la de entrega');
				return res.redirect('/assignHomework');
			}

			if(date1 < today || date2 < today){
				await SEC_FlashService.error(req, 'No puedes asignar tareas a fechas pasadas!');
				return res.redirect('/assignHomework');
			}

			let data = await GEN_CourseHomework.create(dataTemp);
			if (data) {
				SEC_FlashService.success(req, 'Homework Assigned Successfully!');
				return res.redirect('/listAssignedHomeworks');
			}
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/assignHomework');
		}
	},
};