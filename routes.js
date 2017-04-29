'use strict';

const Q = require('q');
const _ = require('lodash');

const GraphAPI = require('./graphAPI');
const sessionStore = require('./sessionStore');

const config = require('./config'); 

const FB_VERIFY_TOKEN = config.fbWebhookVerifyToken;
const FB_PAGE_ID = config.fbPageID; 



function extractMessagingObjects(body) {
	var messages = [];

	for (var i = 0; i < body.entry.length; i++) {
		var eventEntry = body.entry[i];
		if (eventEntry.id.toString() === FB_PAGE_ID){
			var recievedMessages = _.filter(eventEntry.messaging, function(msg) {
				return !!(msg.message || msg.postback);
			})
			messages = messages.concat(recievedMessages);
		}
	}
	return messages;
}


//Main routes
exports.get = function(req, res, next) {
	if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === 'Hello-dude') {
		res.send(req.query['hub.challenge']);
		
	} else {
		res.sendStatus(400);
	}
}


exports.receive = function(req, res, next) {

	//respond as soon as possible
	res.status(200).end();
	const messages = extractMessagingObjects(req.body);
	// if(!(messages[0].sender.id)){next();}
	// if(messages[0].sender.id==FB_PAGE_ID){next();}
	// if(messages[0].sender.id==FB_PAGE_ID){return;}
	if (!messages.length) {
		return;
	}

	var processPromises = _.map(messages, (messaging) => {
		if(messaging.sender.id==FB_PAGE_ID){return;}
		return processMessage(messaging);
	});

	Q.all(processPromises)
	.then(function(){
	})
	.catch(function(err) {
	});
}


//user data handlers
const handleAttachment = require('./handlers/attachment');
const handleQuickReply = require('./handlers/quickreply');
const handleTextMessage = require('./handlers/message');
const handlePostback = require('./handlers/postback');


function processMessage(messaging) {
	const sender = messaging.sender.id;
	if(sender==FB_PAGE_ID){return;}  ///the part is for previnting the page to post 
									///and "error":{"message":"(#100) Tried accessing nonexisting field 
	console.log('senderrrrr' ,sender);
	let sessionId;
	let session;
	let newSession;
	return sessionStore.findOrCreate(sender)
		.then(data => {

			console.log('sender ',sender ,'data  ',JSON.stringify(data));
			
			sessionId = data.sessionId;
			session = data.session;
			newSession = data.newSession;
			if (!session.context.userData) {
				return GraphAPI.getUserProfile(sender)
					.then(user => {
						user.recipientId = sender;
						session.context.userData = user;
						return data;
					});
			}
			return data;	
		})
		.then(data => {
			if (!session.context.userData._id) {
						session.context.userData._id = sender;
						return sessionStore.saveSession(sessionId, session); 
					
			}
		})
		.then(() => {
			return GraphAPI.sendTypingOn(sender);
		})
		.then(() => {

			const atts = messaging.message && messaging.message.attachments;
			if (atts) {
				return handleAttachment(sender, sessionId, session.context, atts);
			} 

			const quickReply = messaging.message && messaging.message.quick_reply;
			if (quickReply) {
				//let payloadTokens = quickReply.payload.split(':');
				const msg = messaging.message.text
				const messege = msg.toLowerCase();
				//return handleQuickReply(sender, sessionId, session.context, quickReply.payload);
				return handleTextMessage(sessionId, session, messege);
			} 

			const msg = messaging.message && messaging.message.text;
			if (msg) {
				const messege = msg.toLowerCase();
				return handleTextMessage(sessionId, session, messege);
			} 

			const payload = messaging.postback && messaging.postback.payload;
			if (payload) {
				const msg = payload
				//const messege = msg.toLowerCase();
				return handleTextMessage(sessionId, session, msg);
				//return handlePostback(sender, sessionId, session.context, payload);
			}
		})
		.catch(err => {
			console.log(err.stack);
		});
}





