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

	//context.current = context.current || {}
 	if (!context.current) { context.current = {}};  
    console.log('current -- ',context.current.length);

 	if (Object.keys(context.current).length == 0) {
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