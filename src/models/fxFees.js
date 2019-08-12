"use strict";

const axios = require("axios");
const variables = require("../config/variables");

exports.getFXFees = async function() {
    let fxFees = await axiosInstance.get('/fx-fees/'+variables.fxFeeGuid);
    return fxFees.data.data;
};