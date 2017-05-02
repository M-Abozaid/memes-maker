'use strict';
const _ = require('lodash');

exports.generateQuickReplies = function (text, replies) {
		return { 
		    "text": text,
		    "quick_replies": _.map(Object.keys(replies), key => {
		    	return {
			        "content_type":"text",
			        "title": replies[key],
			        "payload": key
			      }	
		    })
		}
	}

exports.generateSendLocation = function (text) {
	return { 
	    text: text,
	    quick_replies: [{content_type: 'location'}]
	}	
}

exports.generateButtonsTemplate = function (text, buttons) {

return {
		"attachment":{
			      "type":"template",
			      "payload":{
			        "template_type":"button",
			        "text":text,
					"buttons": _.map(Object.keys(buttons), key => {
					     return {
					        "type":"postback",
					        "title":buttons[key],
					        "webview_height_ratio": "compact",
					        "payload":key
					      }
				   	   })
					}
				}
		}
}


exports.generateGeneric = function(array){
		return{
			"quick_replies":  [
					    		{
						        "content_type":"text",
						        "title": 'next' ,
						        "payload": 1
						      	}
							   ],
		    "attachment":{
		      "type":"template",
		      "payload":{
		        "template_type":"generic",
		        "elements": _.map(array , img => {
		           return{
		           	"title":"ready",
		            "image_url":img.url,
		            "bottons":[ 
		            	{
		            		"title":"use",
				            "type": "postback",
				            "payload":img.name
			            }
		            ]     
		          }
		        })
		      }
		    }
		  }
	}
