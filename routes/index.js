var express = require('express');
var router = express.Router();
const sessionStore = require('../sessionStore');

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var sender= req.params.id
  sessionStore.findOrCreate(sender)
		.then(data => {
			console.log(JSON.stringify(data));
			var text1= data.session.context.current.text1
			var text2= data.session.context.current.text2
 			
 			  let html = `<!DOCTYPE html>
				<html >
				  <head>

				      <meta charset="utf-8">
				      <title>mortada</title>
						
					</head>
					<body>
					<div style=" position: relative;">
						<img style="width: 100%;" src="../mortada.jpg">
						<h1  style="font-size: 55px;z-index: 1000;color: yellow; position: absolute; top: 35%; left: 30%;">`+text1+`</h1>
						<h1  style="font-size: 55px;z-index: 1000;color: yellow; position: absolute; top: 85%; left: 30%;">`+text2+`</h1>
					</div>
					</body>
				</html>`

  			res.end(html)
		})

});

module.exports = router;
