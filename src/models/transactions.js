"use strict";

const variables = require("../config/variables");

exports.getTransactions = async function(contactId) {
    
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    let transactions = await axiosInstance.get('/transactions');
    return transactions.data.data;
};

exports.getTransactionsbyWallet = async function(contactId, financialAccountId) {
    
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    const requestURL = '/wallet/'+financialAccountId+'/transactions';
    let transactions = await axiosInstance.get(requestURL);
    return transactions.data.data;
};