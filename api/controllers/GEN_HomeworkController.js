module.exports = {
	assign: async function (req, res, next) {
		try {
			return res.send(req.param);

			//SEC_FlashService.success(req, 'Course Created Successfully!');
			//return res.redirect('/assignHomework');

		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newHomework');
		}
	},
	create: async function (req, res, next) {



		try {

			const homework_temp = {
				title: req.param('title'),
				description: req.param('description'),
				grade: req.param('grade'),
				achievement: req.param('achievement'),
				topic: req.param('topic')
			};
			

			let data = await GEN_Homework.create(homework_temp);
			if (data) {
				SEC_FlashService.success(req, 'Homework Created Successfully!');
				return res.redirect('/listMenus');
			}
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newMenu');
		}

	},
};