// SEC_UserService.js
module.exports = {
	userInSessionIsAStudent: async function(req) {
		let student = await GEN_Student.findOne({user: req.session.userId});
		if(student){
			return true;
		}
		return false;
	},
	userInSessionIsATeacher: async function(req) {
		let teacher = await GEN_Teacher.findOne({user: req.session.userId});
		if(teacher){
			return true;
		}
		return false;
	}
}