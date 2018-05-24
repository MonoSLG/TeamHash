module.exports = {
	assign: async function(req, res, next){
		try {
			
				//SEC_FlashService.success(req, 'Course Created Successfully!');
				return res.redirect('/assignHomework');
			
		}catch (err){
			await SEC_FlashService.error(req, err.message);
			return res.redirect('/newHomework');
		}
    },
};