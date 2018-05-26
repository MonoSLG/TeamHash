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
			const topics = await GEN_Topic.find();
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
			const coures = await GEN_Course.find();
			const homeworks = await GEN_Homework.find();
			return res.view('App/GEN_Homework/assignHomework',
				{
					cou: coures,
					hom: homeworks
				}
			);
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
    },
    listHomeworks: async function(req, res){
		let Homeworks = await GEN_Homework.find().populate('topic');
		for (let i=0; i<Homeworks.length; i++){
			const item = Homeworks[i]
			const subject = await GEN_Subject.findOne(item.topic.subject);
			Homeworks[i]['subject'] = subject;
		}
		return res.view('App/GEN_Homework/listHomeworks', {data: Homeworks})
	},
	listAssignedHomeworks: async function(req, res){
		let data = await GEN_CourseHomework.find().populateAll();
		return res.view('App/GEN_Homework/listAssignedHomeworks', {data: data})
	},
	viewHomework: async function(req, res){
		try {
			const id = req.param('id');
			let data = await GEN_Homework.findOne(id).populate('topic');
			const subject = await GEN_Subject.findOne(data.topic.subject);
			data['subject'] = subject;
			return res.view('App/GEN_Homework/viewHomework', {data: data});
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},

};