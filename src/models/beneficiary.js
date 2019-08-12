"use strict";

const variables = require("../config/variables");

exports.getBeneficiaries = async function(contactId) {
    
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    let beneficiaries = await axiosInstance.get('/beneficiary');
    return beneficiaries.data.data;
};

exports.getBeneficiary = async function(contactId, beneficiaryId) {
    
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    let beneficiary = await axiosInstance.get('/beneficiary/'+beneficiaryId);
    return beneficiary.data.data;
};

exports.createBeneficiary = async function(contactId, beneficiaryData) {
    
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    let beneficiary = await axiosInstance.post('/beneficiary',beneficiaryData);
    return beneficiary.data.data;
};

exports.getBeneficiaryRequirement = async function(countryCode, currencyCode) {
    
    requestURL = '/beneficiary-Requirement/'+countryCode+'/'+currencyCode;
    let beneficiaryRequirement = await axiosInstance.get(requestURL);
    return beneficiaryRequirement.data.data;
};