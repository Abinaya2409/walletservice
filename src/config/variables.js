"use strict";

const crmAdapterAPI = process.env.CRM_ADAPTER_API;
const fxFeeGuid = process.env.FX_FEE_GUID;
const autoNumberId = process.env.AUTO_NUMBER_GUID;

const variables = {
    crmAdapterAPI,
    fxFeeGuid,
    autoNumberId
};

module.exports = variables;