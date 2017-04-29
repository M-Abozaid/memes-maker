'use strict';
const platformHelpers = require('../platformHelpers');
const sessionStore = require('../sessionStore');
const GraphAPI = require('../graphAPI');


module.exports = function handleTextMessage (sessionId, session, msg) {
	
	const context = session.context;
	context.userData.recipientId =  session.fbid;

	context.msg = msg
	session.state = session.state  || 'new';


	
};
