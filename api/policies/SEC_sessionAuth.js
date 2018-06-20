/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
 module.exports = async function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
	if (req.session.authenticated) {
		res.locals.layout = 'App/layoutApp';

		await loadReminders(req, res);

		await SEC_SecurityService.loadInfoSession(req, res);
		return next();
	}
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
	return res.forbidden('You are not permitted to perform this action.');
};



async function loadReminders(req, res){
	const isAStudent = await SEC_UserService.userInSessionIsAStudent(req);
	let reminders = []
	let grade = req.param('grade');
	let letter = req.param('letter');

	if(!grade){
		grade = '3';
	}
	if(!letter){
		letter = 'B';
	}

	if(isAStudent){
		let course = await GEN_Course.findOne({grade: grade, letter: letter});
		if(course){
			reminders = await GEN_CourseHomework.find({course: course.id}).sort({endDate: 'ASC' }).populateAll();
		}
	}else{
		reminders = await GEN_CourseHomework.find().sort({endDate: 'ASC' }).populateAll();
	}

	res.locals.reminders = reminders;
}