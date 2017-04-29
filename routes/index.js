var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {

  var sender= req.params.id
  sessionStore.findOrCreate(sender)
		.then(data => {
			var text1= data.session.context.userData.first_name
			var text2= data.session.context.userData.last_name
 			
		})
  
  
  let html = `<!DOCTYPE html>
<html >
  <head>

      <meta charset="utf-8">
      <title>mortada</title>
		
	</head>
	<body>
	<div style=" position: relative;">
		<img style="width: 100%;" src="./mortada.jpg">
		<h1  style="z-index: 1000;color: yellow; position: absolute; top: 35%; left: 30%;">`+text1+`</h1>
		<h1  style="z-index: 1000;color: yellow; position: absolute; top: 85%; left: 30%;">`+text2+`</h1>
	</div>
	</body>
</html>`

  res.end(html)
});

module.exports = router;
