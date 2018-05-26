module.exports = {
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