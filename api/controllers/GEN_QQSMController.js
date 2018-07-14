module.exports = {
	questionnaire: [],
	help: 1,
	score: 0,
	phase: 1,
	grade: 7,
	correctAnswer: 0,
	subject: "",
	valueQuestion: 2000,
	currentQuestion: {},

	/**
	 * Elije una pregunta al azar del conjunto de preguntas pasadas por parámetro
	 * de una fase específica
	 * @param {Conjunto de preguntas de una etapa del cuestionario} question 
	 */
	getRandomQuestion(question) {
		if (question.length > 0) {
			let pos = Math.round(Math.random() * (question.length));
			if (pos >= question.length) {
				pos = question.length - 1;
			}
			return question[pos];
		} else {
			return null;
		}

	},

	/**
	 * Determina la siguiente pregunta y la agrega al historial de preguntas
	 */
	configureQuestion: async function () {
		let question = await this.getQuestion();
		let definitiveQuestion = await this.getRandomQuestion(question);

		console.log("La pregunta definitiva ")
		console.log(definitiveQuestion)
		if (definitiveQuestion != null) {

			this.correctAnswer = definitiveQuestion.correctAnswer;
			this.questionnaire.push({ question: definitiveQuestion.id, state: 0 });
			this.currentQuestion = definitiveQuestion;
			return definitiveQuestion;
		} else {

			return null;
		}
	},

	imprimir: async function () {
		console.log("El estado del cuestionario es ");
		console.log(this.questionnaire);
		console.log("La respuesta correcta actual es  " + this.correctAnswer);
		console.log("La etapa es  " + this.phase);
	},
	/**
	 * Inicializa la primera pregunta del cuestionario
	 * y renderiza la vista de inicio del juego
	 */
	init: async function (req, res, next) {
		try {
			this.subject = req.param("subject");
			this.help = 1;
			this.score = 0;
			this.phase=1;
			let definitiveQuestion = await this.configureQuestion();

			return res.view(
				'App/GEN_QQSM/QQSMGame',
				{
					message: "",
					data: definitiveQuestion,
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
	/**
	 * Obtiene un conjunto de preguntas de la base de datos
	 */
	getQuestion: async function () {
		try {
			let data = await GEN_Question.find({
				where: {
					phase: this.phase,
					grade: this.grade,
					subject: this.subject
				}
			});
			if (data) {
				return data;
			} else {
				return null;
			}
		} catch (err) {
			return null;
		}
	},

	useHelp: async function (req, res) {
		this.valueQuestion = 1000;
		let pos = Math.round(Math.random() * 3);
		while (pos == this.correctAnswer) {
			pos = Math.round(Math.random() * 3);
		}
		this.help = 0;
		let message =[
			this.currentQuestion.answers[pos] ,
			this.currentQuestion.answers[this.correctAnswer]
		];
			

		return res.view(
			'App/GEN_QQSM/QQSMGame',
			{
				message: message,
				data: this.currentQuestion,
				score: this.score,
				help: this.help,
				phase: this.phase
			}
		);
	},

	/**
	 * Función encargada de validar la respuesta enviada por parámetro
	 */
	validate: async function (req, res) {
		let respuesta = req.param("respuesta");

		let questionPrev = this.questionnaire[this.phase - 1];

		if (respuesta == this.correctAnswer) {
			this.phase = this.phase + 1;
			this.score = this.score + this.valueQuestion;
			let question = await this.configureQuestion();
			if (JSON.stringify(question) == "null") {
				await this.registerQuestionnaire();
				let copyscore = this.score;
				let copyHelp = this.help;
				this.phase = 1;
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
				this.correctAnswer = question.correctAnswer;
				this.valueQuestion = 2000;
				return res.view(
					'App/GEN_QQSM/QQSMGame',
					{
						message: "",
						data: question,
						score: this.score,
						help: this.help,
						phase: this.phase
					}
				);
			}
		} else {
			questionPrev.state = 1;
			await this.registerQuestionnaire();
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

	registerQuestionnaire: async function () {
		let questionnaireAux = {
			student: "user",
			questions: this.questionnaire,
			date: new Date(),
			score: this.score
		}
		this.questionnaire = [];
		try {
			let data = await GEN_Questionnaire.create(questionnaireAux);
		} catch (error) {
			console.log(error);
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

