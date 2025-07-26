"use strict";

require('dotenv').config({ path: './../.env' });

const all_env = [
    'PORT',
    'SERVICENAME',
    'INCOMING_URL',
    'ENV'
];

(function ensureVars(vars){
    vars.forEach(particularEnvVar => {
        if(!process.env[particularEnvVar]){
            throw new Error(`Missing env variable ' ${particularEnvVar} '`);
        }
    });
})(all_env);

const config = {
    port: process.env.PORT,
    servicename: process.env.SERVICENAME,
    incomingurl: process.env.INCOMING_URL,
    env: process.env.ENV
};

module.exports = config;

// all tests pass.