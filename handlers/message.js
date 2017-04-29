'use strict';
const platformHelpers = require('../platformHelpers');
const sessionStore = require('../sessionStore');
const GraphAPI = require('../graphAPI');
var htmlConvert = require('html-convert');
var fs = require('fs');
var path = require('path');

module.exports = function handleTextMessage (sessionId, session, msg) {
	
	const context = session.context;
	context.userData.recipientId =  session.fbid;

	context.msg = msg
	session.state = session.state  || 'new';

	context.current = context.current || {}
 
	var convert = htmlConvert();

	var wstream = fs.createWriteStream(path.join(__dirname, './mortada3.jpebg'))

	convert('https://obscure-badlands-13161.herokuapp.com/render/1473221956085675', {format:'jpeg', quality: 50})  
	  .pipe(wstream);
	 
	 wstream.on('finish', function () {
	 	// let data = {
			// 	    "attachment":{
			// 	      "type":"image",
			// 	      "payload":{
			// 	        "url":"https://obscure-badlands-13161.herokuapp.com/mortada3.jpeg"
			// 	      }
			// 	    }
			// 	}
	   console.log('file has been written');
	  // GraphAPI.sendTemplateMessage(context.userData.recipientId,data)
	});

};