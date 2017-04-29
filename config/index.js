'use strict';

/**
 * The Module Dynamically loads the configurations for
 * the heroku deployed project. This way of managing the configuration
 * is done because of the heroku suggestion for
 * Multiple Environments for the App article.
 */

const url = require('url');


/**
 * Returns the Redis config object for the staging,
 * testing and production servers
 * @returns {{port: *, host: (*|string), pass: *}}
 * @private
 */
function redisConfig() {
    if (!process.env.REDISCLOUD_URL || process.env.REDISCLOUD_URL === 'undefined') {
        return null;
    }
    var redisURL = url.parse(process.env.REDISCLOUD_URL);
    return {
        port: redisURL.port,
        host: redisURL.hostname,
        pass: redisURL.auth.split(':')[1]
    };
}

/**
 * Returns the mongo db config for the staging,
 * testing and production servers
 * @returns {*}
 * @private
 */


function mergeSharedConfigs(shared, config) {
    for (var key in shared) {
        config[key] = config[key] || shared[key];
    }

    return config
}


/**
 * Creates a config object dynamically for the application.
 * @returns {*}
 * @private
 */
function createConfig() {
    const env = process.env.NODE_ENV || 'development';
    var config = require('./config');
    console.log( 'env ' + env );

    config = mergeSharedConfigs(config.shared, config[env]);
    
    config.fbPageToken = process.env.FB_VERIFY_TOKEN || config.fbPageToken;
    config.fbPageID = process.env.FB_PAGE_ID || config.fbPageID;
    config.fbWebhookVerifyToken = process.env.FB_WEBHOOK_VERIFY_TOKEN || config.fbWebhookVerifyToken;
    //config.witToken = process.env.WIT_TOKEN || config.witToken;

    config.redis =  config.redis; //redisConfig() ||
    //config.db = mongoConfig() || config.db;

    console.log(' config insid createConfig '+ JSON.stringify(config));
    return config;
}

module.exports = createConfig();