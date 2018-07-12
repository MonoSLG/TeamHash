module.exports = {
	questionnaire: [],
	help: 1,
	score: 0,
	phase: 1,
	grade: 7,

	init: async function (req, res, next) {
		try {

			let question = await this.getQuestion();

			this.questionnaire.push({ question: question[0], state: 0 });
			return res.view(
				'App/GEN_QQSM/QQSMGame',
				{
					data: question[0],
					score: this.score,
					help: this.help,
					phase: this.phase
				}
			);
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newCourse');
		}
	},

	getQuestion: async function () {
		try {
			let data = await GEN_Question.find({
				where: {
					phase: this.phase,
					grade: this.grade
				}
			});
			console.log("data");
			console.log(data);
			if (data) {
				return data;
			} else {
				return null;

			}
		} catch (err) {
			return null;
		}
	},



	validate: async function (req, res) {
		let respuesta = req.param("respuesta");

		console.log("Datos ____________");
		console.log(respuesta);
		console.log("____________");
		let questionPrev = this.questionnaire[this.phase - 1];
		let questio
		console.log(questionPrev);
		console.log(questionPrev["correctAnswer"]);
		console.log(questionPrev.question.correctAnswer);

		if (respuesta == questionPrev.question.correctAnswer) {
			this.phase = this.phase + 1;
			console.log("La nueva fase es " + this.phase);
			this.score = this.score + this.phase * 1000;
			let question = await this.getQuestion();
			console.log("W"+JSON.stringify(question));
			if (JSON.stringify(question)=='[]') {
				let copyscore = this.score;
				let copyHelp = this.help;
				this.phase=1;
				this.score = 0;
				this.help = 1;
				return res.view(
					'App/GEN_QQSM/QQSMGameResume',
					{
						score: copyscore,
						help: copyHelp,
						message: "Felicidades, ha ganado"
					}
				);
			} else {
				this.questionnaire.push({ question: question[0], state: 0 });
				return res.view(
					'App/GEN_QQSM/QQSMGame',
					{
						data: question[0],
						score: this.score,
						help: this.help,
						phase: this.phase
					}
				);
			}
		} else {
			return res.view(
				'App/GEN_QQSM/QQSMGameResume',
				{
					score: this.score,
					help: this.help,
					message: "Lo sentimos, ha perdido"
				}
			);

		}
	},

	update: async function (req, res, next) {
		const id = req.param('id');
		if (!id) {
			return res.redirect('/listCourses');
		}
		try {
			let data = await GEN_Course.update(id, {
				grade: req.param('grade'),
				letter: req.param('letter'),
				year: req.param('year')
			});
			if (data) {
				SEC_FlashService.success(req, 'Course Updated Successfully!');
				return res.redirect('/listCourses');
			}
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/editCourse/' + id);
		}
	},
	delete: async function (req, res) {
		const id = req.param('id');
		if (!id) {
			return res.redirect('/listCourses');
		}
		try {
			await GEN_Course.destroy(id);
			SEC_FlashService.success(req, 'Course deleted Successfully!');
			return res.redirect('/listCourses');
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/listCourses');
		}
	}
};

