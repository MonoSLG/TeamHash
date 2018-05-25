module.exports = {
	assign: async function (req, res, next) {
		try {

			//SEC_FlashService.success(req, 'Course Created Successfully!');
			return res.redirect('/assignHomework');

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
				achievement: req.param('achievement'),
				studyMaterials: req.param('studyMaterials'),
				topic: req.param('topic')
			};
			homework_temp.studyMaterials.forEach(element => {
				
				console.log(typeof(element));
			});

			let data = await GEN_Homework.create(homework_temp);
			if (data) {
				SEC_FlashService.success(req, 'Menu Created Successfully!');
				return res.redirect('/listMenus');
			}
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newMenu');
		}

	},
};