'use strict';
const platformHelpers = require('../platformHelpers');
const sessionStore = require('../sessionStore');
const GraphAPI = require('../graphAPI');
var htmlConvert = require('html-convert');
var fs = require('fs');
var path = require('path');

module.exports = function handleTextMessage (sessionId, session, msg) {
	
	const context = session.context;
	var recipientId =  session.fbid;

	context.msg = msg
	session.state = session.state  || 'new';
	if (msg == 'contexxt') {context.current = {}}
	//context.current = context.current || {}
 	if (!context.current) { context.current = {}};  
    console.log('current -- ',context.current);


    if (context.msg == 'ready') {
    	context.current.main = 'ready';
	var images = [];

	(function initCustomActions() {
	  var imagesPath = path.join(__dirname, '../public/outOf');
	  var imageName = fs.readdirSync(imagesPath);

	  imageName.forEach(function(im) {
	    images.push({name:im,
	      url:'https://obscure-badlands-13161.herokuapp.com/outOf/'+im})
	  });
	})();

	//console.log('image ',images);
	

	let numOfVeiws = Math.floor(images.length/10) 
	context.current.thisVeiw = context.current.thisVeiw || 0
	var view = images.splice(context.current.thisVeiw * 10 ,10)
	let data = platformHelpers.generateGeneric(view)
	GraphAPI.sendTemplateMessage(recipientId, data).then(()=>{
		if(context.current.thisVeiw != numOfVeiws ){context.current.thisVeiw += 1}else{context.current.thisVeiw = 0}
		context.current.chooseIm = true;
		session.context = context
		sessionStore.saveSession(sessionId, session)
	})	

    }



 	if (context.current.main === 'addText') {
 		let data = {
				    "attachment":{
				      "type":"image",
				      "payload":{
				        "url":"https://obscure-badlands-13161.herokuapp.com/mortada-temp.jpg"
				      }
				    }
				}
	
	  			GraphAPI.sendTemplateMessage(recipientId,data).then(()=>{
	  				GraphAPI.sendPlainMessage(recipientId, ' اكتب النص الاول').then(()=>{
			 			context.current.first = true
			 			session.context = context
			 			sessionStore.saveSession(sessionId, session)
			 		})
	  			})
 		

 	} else {
 		if (context.current.first && !context.current.text1) {
 			GraphAPI.sendPlainMessage(recipientId, ' اكتب النص التاني').then(()=>{
 			context.current.text1 = msg
 			session.context = context
 			sessionStore.saveSession(sessionId, session)
 		})
 		} else {
 			if (context.current.text1 && !context.current.text2) {
 				GraphAPI.sendPlainMessage(recipientId, ' تحميل...').then(()=>{
		 			context.current.text2 = msg
		 			session.context = context
		 			sessionStore.saveSession(sessionId, session).then(()=>{
		 				let data = {
							    "attachment":{
							      "type":"image",
							      "payload":{
							        "url":"https://obscure-badlands-13161.herokuapp.com/users/"+recipientId+"/mortada3.jpg"
							      }
							    }
							}
				
				  			GraphAPI.sendTemplateMessage(recipientId,data).then(()=>{
				  				context.current = {}
				  				session.context = context
				  				sessionStore.saveSession(sessionId, session)
				  			})
		 			})
		 		})
 			
 				
 			
 		}
 	}
	
}

};