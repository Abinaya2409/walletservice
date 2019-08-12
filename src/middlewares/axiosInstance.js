"use strict";

const axios = require('axios');
const variables = require('../config/variables');

const axiosHeaderInstance = (ctx,next) => {
    const axiosInstance = axios.create({
        baseURL: variables.crmAdapterAPI,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    global.axiosInstance = axiosInstance;
    console.log(axiosInstance)
    return next();
}

module.exports = axiosHeaderInstance;