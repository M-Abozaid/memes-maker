var express = require('express');
var router = express.Router();
var htmlConvert = require('html-convert');
/* GET users listing. */
router.get('/mortada3.png', function(req, res, next) {

	var convert = htmlConvert();

		//var wstream = fs.createWriteStream(path.join(__dirname, '../public/mortada3.jpeg'))

		convert('https://obscure-badlands-13161.herokuapp.com/render/1473221956085675', {format:'png', quality: 4})  
		  .pipe(res);
		  
  //res.send('respond with a resource');
});

module.exports = router;
