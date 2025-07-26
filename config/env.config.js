"use strict";

require('dotenv').config({ path: __dirname + '/../.env' });
const logger = require('./../utils/logger.utility');

logger.info(
    `{module: env.config.js} ENTRY`
)

const all_env = [
    'PORT',
    'SERVICENAME',
    'INCOMING_URL',
    'ENV'
];

(function ensureVars(vars){
    logger.info(`{module: env.config.js} [ensureVars] entry.`);
    logger.info(`Checking env variables: ${vars}`);
    vars.forEach(particularEnvVar => {
        if(!process.env[particularEnvVar]){
            throw new Error(`Missing env variable ' ${particularEnvVar} '`);
        }
    });

    logger.info(`{module: env.config.js} [ensureVars] exiting.`);
})(all_env);

const config = {
    port: process.env.PORT,
    servicename: process.env.SERVICENAME,
    incomingurl: process.env.INCOMING_URL,
    env: process.env.ENV
};

logger.info(
    `{module: env.config.js} ${JSON.stringify(config)}`
)

logger.info(
    `{module: env.config.js} EXIT`
)

module.exports = config;
// all tests pass.