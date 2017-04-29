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
 
	
	 
	
	 	let data = {
				    "attachment":{
				      "type":"video",
				      "payload":{
				        "url":"https://obscure-badlands-13161.herokuapp.com/users/mortada3.jpg"
				      }
				    }
				}
	
	  GraphAPI.sendTemplateMessage(context.userData.recipientId,data)


};