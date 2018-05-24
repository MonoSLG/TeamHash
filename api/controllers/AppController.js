/**
 * AppController
 *
 * @description :: Server-side logic for managing apps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	profile: async function (req, res, next) {
		try {
			const data = await SEC_User.findOne(req.session.userId);
			return res.view('App/profile', { data: data });
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
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
	newTeacher: async function (req, res) {
		return res.view('App/GEN_Teacher/newTeacher')
	},
	listTeachers: async function (req, res) {
		const teachers = await GEN_Teacher.find();
		return res.view('App/GEN_Teacher/listTeachers', { data: teachers })
	},
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
	newStudent: async function (req, res) {
		return res.view('App/GEN_Student/newStudent')
	},
	listStudents: async function (req, res) {
		const Students = await GEN_Student.find();
		return res.view('App/GEN_Student/listStudents', { data: Students })
	},
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
	newCourse: async function (req, res) {
		return res.view('App/GEN_Course/newCourse')
	},
	listCourses: async function (req, res) {
		const Courses = await GEN_Course.find();
		return res.view('App/GEN_Course/listCourses', { data: Courses })
	},
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
	newSubject: async function (req, res) {
		return res.view('App/GEN_Subject/newSubject')
	},
	listSubjects: async function (req, res) {
		const Subjects = await GEN_Subject.find();
		return res.view('App/GEN_Subject/listSubjects', { data: Subjects })
	},
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
	//Homework controllers
	newHomework: async function (req, res) {

		try {
			const subjects = await GEN_Subject.find();
			const topics = await GEN_Topic.find();
			return res.view('App/GEN_Homework/newHomework',
				{
					sub: subjects,
					top: topics
				}
			);
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
		}
	},
	//assignHomework controllers
	assignHomework: async function (req, res) {

		try {
			const subjects = await GEN_Subject.find();
			const topics = await GEN_Topic.find();
			
			return res.view('App/GEN_Homework/assignHomework',
				{
					sub: subjects,
					top: topics
				}
			);
		} catch (err) {
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/');
    }

	}

};