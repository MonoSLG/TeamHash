/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	profile: async function(req, res, next){
		try {
			const data = await SEC_User.findOne(req.session.userId);
			return res.view('App/profile', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	mundo: async function(req, res){
		try {
			let data = await SEC_Menu.find().populateAll();
			return res.send(data);
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Teacher controllers
	newTeacher: async function(req, res){
		return res.view('App/GEN_Teacher/newTeacher')
	},
	listTeachers: async function(req, res){
		const teachers = await GEN_Teacher.find();
		return res.view('App/GEN_Teacher/listTeachers', {data: teachers})
	},
	editTeacher: async function(req, res, next){
		try {
			const id = req.param('id');
			const data = await GEN_Teacher.findOne(id);
			return res.view('App/GEN_Teacher/editTeacher', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Students controllers
	newStudent: async function(req, res){
		return res.view('App/GEN_Student/newStudent')
	},
	listStudents: async function(req, res){
		const Students = await GEN_Student.find();
		return res.view('App/GEN_Student/listStudents', {data: Students})
	},
	editStudent: async function(req, res, next){
		try {
			const id = req.param('id');
			const data = await GEN_Student.findOne(id);
			return res.view('App/GEN_Student/editStudent', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Course controllers
	newCourse: async function(req, res){
		return res.view('App/GEN_Course/newCourse')
	},
	listCourses: async function(req, res){
		const Courses = await GEN_Course.find();
		return res.view('App/GEN_Course/listCourses', {data: Courses})
	},
	editCourse: async function(req, res, next){
		try {
			const id = req.param('id');
			const data = await GEN_Course.findOne(id);
			return res.view('App/GEN_Course/editCourse', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Subject controllers
	newSubject: async function(req, res){
		return res.view('App/GEN_Subject/newSubject')
	},
	listSubjects: async function(req, res){
		const Subjects = await GEN_Subject.find();
		return res.view('App/GEN_Subject/listSubjects', {data: Subjects})
	},
	editSubject: async function(req, res, next){
		try {
			const id = req.param('id');
			const data = await GEN_Subject.findOne(id);
			return res.view('App/GEN_Subject/editSubject', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Topic controllers
	newTopic: async function(req, res){
		const subjects = await GEN_Subject.find();
		return res.view('App/GEN_Topic/newTopic', {data: subjects});
	},
	listTopics: async function(req, res){
		const topics = await GEN_Topic.find().populate('subject');
		return res.view('App/GEN_Topic/listTopics', {data: topics})
	},
	editTopic: async function(req, res, next){
		try {
			const id = req.param('id');
			const data = await GEN_Topic.findOne(id);
			const subjects = await GEN_Subject.find();
			return res.view('App/GEN_Topic/editTopic', {data: data, subjects: subjects});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//Homework controllers
	newHomework: async function (req, res) {
		try {
			const subjects = await GEN_Subject.find();
			let topics = [];
			if(subjects.length > 0){
				topics = await GEN_Topic.find({subject: subjects[0].id});
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
	assignHomework: async function (req, res) {
		try {
			const courses = await GEN_Course.find();
			let homeworks = [];
			if(courses.length > 0){
				homeworks = await GEN_Homework.find({grade: courses[0].grade}).populate('topic');
				for (let i=0; i<homeworks.length; i++){
					const item = homeworks[i]
					const subject = await GEN_Subject.findOne(item.topic.subject);
					homeworks[i]['subject'] = subject;
				}
			}
			return res.view('App/GEN_Homework/assignHomework',
				{
					cou: courses,
					hom: homeworks
				}
			);
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
    },
    listHomeworks: async function(req, res){
    	const isAStudent = await SEC_UserService.userInSessionIsAStudent(req);
		const isATeacher = await SEC_UserService.userInSessionIsATeacher(req);

		let grade = req.param('grade');
		if(!grade){
			if(isAStudent)
				grade = '3';
			else
				grade = '1';
		}

		let Homeworks = [];

		if(isAStudent || isATeacher){
			Homeworks = await GEN_Homework.find({grade: grade}).populate('topic');	
		}else{
			Homeworks = await GEN_Homework.find().populate('topic');
		}
		for (let i=0; i<Homeworks.length; i++){
			const item = Homeworks[i]
			const subject = await GEN_Subject.findOne(item.topic.subject);
			Homeworks[i]['subject'] = subject;
		}
		return res.view('App/GEN_Homework/listHomeworks', {data: Homeworks})
	},
	listAssignedHomeworks: async function(req, res){
		const isAStudent = await SEC_UserService.userInSessionIsAStudent(req);
		const isATeacher = await SEC_UserService.userInSessionIsATeacher(req);

		let data = []
		let grade = req.param('grade');
		let letter = req.param('letter');

		if(!grade){
			if(isAStudent)
				grade = '3';
			else
				grade = '1';
		}
		if(!letter){
			if(isAStudent)
				letter = 'A';
			else
				letter = 'A';
		}

		if(isAStudent || isATeacher){
			let course = await GEN_Course.findOne({grade: grade, letter: letter});
			if(course){
				data = await GEN_CourseHomework.find({course: course.id}).sort({endDate: 'ASC' }).populateAll();
			}
		}else{
			data = await GEN_CourseHomework.find().sort({endDate: 'ASC' }).populateAll();
		}

		for (let i=0; i<data.length; i++){
			let homework = data[i].homework;
			homework = await GEN_Homework.findOne(homework.id).populate('topic');
			const subject = await GEN_Subject.findOne(homework.topic.subject);
			homework['subject'] = subject;
			data[i].homework = homework;
		}
		return res.view('App/GEN_Homework/listAssignedHomeworks', {data: data})
	},
	viewHomework: async function(req, res){
		try {
			const courseId = req.param('courseId');
			const homeworkId = req.param('homeworkId');
			let data = await GEN_CourseHomework.findOne({course: courseId, homework: homeworkId}).populate('homework');
			const topic = await GEN_Topic.findOne(data.homework.topic).populate('subject');
			data.homework.topic = topic;
			return res.view('App/GEN_Homework/viewHomework', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},

};