module.exports = function(req, res, next) {
	if (SEC_SecurityService.verifyPermissionsToPath(res, req.path)) {
		return next();
	}
	return res.forbidden('You are not permitted to perform this action.');
};