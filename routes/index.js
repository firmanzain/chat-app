var express = require('express');
var router = express.Router();

const TestController = require('../app/controllers/test.controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/test/create', TestController.createData)

module.exports = router;
