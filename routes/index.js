var express = require('express');
var router = express.Router();

router.all('*', function(req, res, next) {
	res.status(404).json({
		error: 'error.not_found'
	})
});

module.exports = router;
