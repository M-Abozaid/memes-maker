'use strict';

const sessionStore = require('../sessionStore');
const GraphAPI = require('../graphAPI');

const _ = require('lodash');
const Q = require('q');

module.exports = function handler(sender, sessionId, context, atts) {
	
	let promises = _.map(atts, att => {
		switch(att.type){
			case 'location':
				return processLocationData(sender, att);
			default:
				return GraphAPI.sendPlainMessage(sender,'Wow, cool pic! I\'ll keep this one ;)');
		}
	});

	return Q.all(promises)
	.then(function() {
		return sessionStore.save(sessionId, context);
	});
};


