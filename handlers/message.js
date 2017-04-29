'use strict';
const platformHelpers = require('../platformHelpers');
const sessionStore = require('../sessionStore');
const GraphAPI = require('../graphAPI');
var htmlConvert = require('html-convert');
var fs = require('fs');

module.exports = function handleTextMessage (sessionId, session, msg) {
	
	const context = session.context;
	context.userData.recipientId =  session.fbid;

	context.msg = msg
	session.state = session.state  || 'new';

	context.current = context.current || {}
 
	var convert = htmlConvert();

	var wstream = fs.createWriteStream('../public/mortada3.jpeg')

	convert('https://obscure-badlands-13161.herokuapp.com/1473221956085675', {format:'jpeg', quality: 50})  
	  .pipe(wstream);
	 
	 wstream.on('finish', function () {
	 	
	  console.log('file has been written');
	});

};
process.stdout