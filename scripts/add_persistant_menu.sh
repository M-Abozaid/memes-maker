#!/bin/bash
#PAGE_ACCESS_TOKEN=$(node -e "console.log(require('./config').fbPageToken);")
 # ,
    # {
    #   "type":"postback",
    #   "title":"delete activity (امسح نشاط)",
    #   "payload":"DELETE_ACTIVITY"
    # }
    
curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type" : "call_to_actions",
  "thread_state" : "existing_thread",
  "call_to_actions":[
    {
      "type":"postback",
      "title":"Language (اللغة)",
      "payload":"CHOOSE_LANGUAGE"
    }

  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAGCwOXSeYsBAII8O2PpPLM2kVNv80Ge78FR1tuima9fJdzTI5RGufCqBmqN4aICPMN9ZCENFhomY3EOZBdqZBZAVOFzYwvvw2ZA2GanvVVNOPcxAbBAO3HR5ztoV9z2L4hZBPkjUIYKkxTdZC6DgFvcGJZAL28Ftxrha60fge5pOwZDZD"
