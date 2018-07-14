/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/*
	*Obtiene la información del usuario actual y la renderiza a una vista para su despliegue
	*/
	profile: async function (req, res, next) {
		try {
			const data = await SEC_User.findOne(req.session.userId);
			return res.view('App/profile', { data: data });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	/*
	*Retorna el conjunto de ítems del menu principal
	*/
	mundo: async function (req, res) {
		try {
			let data = await SEC_Menu.find().populateAll();
			return res.send(data);
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Teacher controllers
	/** 
	* Renderiza la vista para la creación de profesores
	*/
	newTeacher: async function (req, res) {
		return res.view('App/GEN_Teacher/newTeacher')
	},
	/**
	 * Renderiza la vista para ver los profesores
	 */
	listTeachers: async function (req, res) {
		const teachers = await GEN_Teacher.find();
		return res.view('App/GEN_Teacher/listTeachers', { data: teachers })
	},
	/**
	 * Renderiza la vista para editar un profesor junto con su información
	 */
	editTeacher: async function (req, res, next) {
		try {
			const id = req.param('id');
			const data = await GEN_Teacher.findOne(id);
			return res.view('App/GEN_Teacher/editTeacher', { data: data });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Students controllers
	/** 
	* Renderiza la vista para la creación de estudiantes
	*/
	newStudent: async function (req, res) {
		return res.view('App/GEN_Student/newStudent')
	},
	/**
	 * Renderiza la vista para ver los estudiantes
	 */
	listStudents: async function (req, res) {
		const Students = await GEN_Student.find();
		return res.view('App/GEN_Student/listStudents', { data: Students })
	},
	/**
	 * Renderiza la vista para editar un estudiante junto con su información
	 */
	editStudent: async function (req, res, next) {
		try {
			const id = req.param('id');
			const data = await GEN_Student.findOne(id);
			return res.view('App/GEN_Student/editStudent', { data: data });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Course controllers
	/** 
	* Renderiza la vista para la creación de cursos
	*/
	newCourse: async function (req, res) {
		return res.view('App/GEN_Course/newCourse')
	},
	/**
	 * Renderiza la vista para ver los cursos
	 */
	listCourses: async function (req, res) {
		const Courses = await GEN_Course.find();
		return res.view('App/GEN_Course/listCourses', { data: Courses })
	},
	/**
	 * Renderiza la vista para editar un curso junto con su información
	 */
	editCourse: async function (req, res, next) {
		try {
			const id = req.param('id');
			const data = await GEN_Course.findOne(id);
			return res.view('App/GEN_Course/editCourse', { data: data });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Subject controllers
	/** 
	* Renderiza la vista para la creación de materias
	*/
	newSubject: async function (req, res) {
		return res.view('App/GEN_Subject/newSubject')
	},
	/**
	 * Renderiza la vista para ver las materias
	 */
	listSubjects: async function (req, res) {
		const Subjects = await GEN_Subject.find();
		return res.view('App/GEN_Subject/listSubjects', { data: Subjects })
	},
	/**
	 * Renderiza la vista para editar una materia junto con su información
	 */
	editSubject: async function (req, res, next) {
		try {
			const id = req.param('id');
			const data = await GEN_Subject.findOne(id);
			return res.view('App/GEN_Subject/editSubject', { data: data });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Topic controllers
	/** 
	* Renderiza la vista para la creación de temas
	*/
	newTopic: async function (req, res) {
		const subjects = await GEN_Subject.find();
		return res.view('App/GEN_Topic/newTopic', { data: subjects });
	},
	/**
	 * Renderiza la vista para ver los temas
	 */
	listTopics: async function (req, res) {
		const topics = await GEN_Topic.find().populate('subject');
		return res.view('App/GEN_Topic/listTopics', { data: topics })
	},
	/**
	 * Renderiza la vista para editar un tema junto con su información
	 */
	editTopic: async function (req, res, next) {
		try {
			const id = req.param('id');
			const data = await GEN_Topic.findOne(id);
			const subjects = await GEN_Subject.find();
			return res.view('App/GEN_Topic/editTopic', { data: data, subjects: subjects });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Homework controllers
	/** 
	* Renderiza la vista para la creación de tareas
	*/
	newHomework: async function (req, res) {
		try {
			const subjects = await GEN_Subject.find();
			let topics = [];
			if (subjects.length > 0) {
				topics = await GEN_Topic.find({ subject: subjects[0].id });
			}
			const courses = await GEN_Course.find();
			return res.view('App/GEN_Homework/newHomework',
				{
					courses: courses,
					sub: subjects,
					top: topics
				}
			);
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	/**
	 * Obtiene la información necesaria para la asignación de tareas, además de retornar la
	 * vista con su información
	 */
	assignHomework: async function (req, res) {
		try {
			const courses = await GEN_Course.find();
			let homeworks = [];
			if (courses.length > 0) {
				homeworks = await GEN_Homework.find({ grade: courses[0].grade }).populate('topic');
				for (let i = 0; i < homeworks.length; i++) {
					const item = homeworks[i]
					const subject = await GEN_Subject.findOne(item.topic.subject);
					homeworks[i]['subject'] = subject;
				}
			}
			return res.view('App/GEN_Homework/assignHomework', { cou: courses, hom: homeworks });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	/**
	 * Lista las tareas por grado si el usuario es un estudiante
	 */
	listHomeworks: async function (req, res) {
		const isAStudent = await SEC_UserService.userInSessionIsAStudent(req);
		const isATeacher = await SEC_UserService.userInSessionIsATeacher(req);

		let grade = this.validarGrade(req.param('grade'), isAStudent);

		let Homeworks = [];

		if (isAStudent || isATeacher) {
			Homeworks = await GEN_Homework.find({ grade: grade }).populate('topic');
		} else {
			Homeworks = await GEN_Homework.find().populate('topic');
		}
		for (let i = 0; i < Homeworks.length; i++) {
			const item = Homeworks[i]
			const subject = await GEN_Subject.findOne(item.topic.subject);
			Homeworks[i]['subject'] = subject;
		}
		return res.view('App/GEN_Homework/listHomeworks', { data: Homeworks })
	},

	/**
	 * Valida dependiendo si el usuario es un estudiante el grado pasado por parametro
	 * @param {Grado a evaluar} grade 
	 * @param {Indicativo de estudiante} isAStudent 
	 */
	validarGrade(grade, isAStudent) {
		if (!grade) {
			if (isAStudent)
				grade = '3';
			else
				grade = '1';
		}
		return grade;

	},
	/**
	 * Valida dependiendo si el usuario es un estudiante la letra del grado pasado por parametro
	 * @param {Letra a evaluar} grade 
	 * @param {Indicativo de estudiante} isAStudent 
	 */
	validarLetter(letter, isAStudent) {
		if (!letter) {
			if (isAStudent)
				letter = 'A';
			else
				letter = 'A';
		}
		return letter;
	},
	/**
	 * Obtiene las tareas asignadas a un curso de forma ascendente y retorna la información a la vista
	 * correspondiente para visualizarlas
	 */
	listAssignedHomeworks: async function (req, res) {
		const isAStudent = await SEC_UserService.userInSessionIsAStudent(req);
		const isATeacher = await SEC_UserService.userInSessionIsATeacher(req);

		let data = []
		let grade = this.validarGrade(req.param('grade'), isAStudent);
		let letter = this.validarLetter(req.param('letter'), isAStudent);

		if (isAStudent || isATeacher) {
			let course = await GEN_Course.findOne({ grade: grade, letter: letter });
			if (course) {
				data = await GEN_CourseHomework.find({ course: course.id }).sort({ endDate: 'ASC' }).populateAll();
			}
		} else {
			data = await GEN_CourseHomework.find().sort({ endDate: 'ASC' }).populateAll();
		}

		for (let i = 0; i < data.length; i++) {
			let homework = data[i].homework;
			homework = await GEN_Homework.findOne(homework.id).populate('topic');
			const subject = await GEN_Subject.findOne(homework.topic.subject);
			homework['subject'] = subject;
			data[i].homework = homework;
		}
		return res.view('App/GEN_Homework/listAssignedHomeworks', { data: data })
	},
	/**
	 * Permite consultar la información de una tarea y la muestra en su vista correspondiente
	 */
	viewHomework: async function (req, res) {
		try {
			const courseId = req.param('courseId');
			const homeworkId = req.param('homeworkId');
			let data = await GEN_CourseHomework.findOne({ course: courseId, homework: homeworkId }).populate('homework');
			const topic = await GEN_Topic.findOne(data.homework.topic).populate('subject');
			data.homework.topic = topic;
			return res.view('App/GEN_Homework/viewHomework', { data: data });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},


	QQSMGameConfig: async function (req, res) {
		try {
			let definitiveSubjects = [];
			let subjects = await GEN_Subject.find();

			for (let i = 0; i < subjects.length; i++) {
				const subjectTemp = subjects[i];
				let data = await GEN_Question.find({
					where: {
						subject: subjectTemp.id
					}
				});
				if (data.length > 2) {
					definitiveSubjects.push(subjectTemp);
				}

			}

			return res.view('App/GEN_QQSM/configQQSM', { data: definitiveSubjects });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},

};