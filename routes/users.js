var express = require('express');
var router = express.Router();
var htmlConvert = require('html-convert');
/* GET users listing. */
router.get('/:id/mortada3.jpg', function(req, res, next) {
 var sender= req.params.id
	var convert = htmlConvert();

		//var wstream = fs.createWriteStream(path.join(__dirname, '../public/mortada3.jpeg'))
		res.writeHead(200, {
            'Content-Type': 'image/jpeg'
        });
		convert('https://obscure-badlands-13161.herokuapp.com/render/'+sender, {format:'jpg', quality: 90})  
		  .pipe(res);
		  
  //res.send('respond with a resource');
});

module.exports = router;
