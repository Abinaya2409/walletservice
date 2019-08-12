"use strict";

const variables = require("../config/variables");

exports.getWallets = async function(contactId) {
    
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    let wallets = await axiosInstance.get('/wallet');
    return wallets.data.data;
};

exports.getWallet = async function(contactId, financialAccountId) {
    
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    let wallet = await axiosInstance.get('/wallet/'+financialAccountId);
    return wallet.data.data;
};

exports.updateWalletBalance = async function(financialAccountId, balance) {
    
    const requestURL = '/wallet/'+financialAccountId+'/updatebalance';
    let wallet = await axiosInstance.put(requestURL, {
        balance: balance
    });
    return wallet.data.data;
};

exports.createTransactions = async function(contactId, financialAccountId, transactionDetails) {
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    const requestURL = '/wallet/'+financialAccountId+'/transactions';
    let transaction = await axiosInstance.post(requestURL, transactionDetails);
    return transaction.data.data;
};

exports.getAutoGenNumber = async function() {
    const requestURL = '/autonumbering/'+variables.autoNumberId;
    let autoGenNumber = await axiosInstance.get(requestURL);
    return autoGenNumber.data.data;
};

exports.updateAutoGenNumber = async function(autoGenNumber) {
    const requestURL = '/autonumbering/'+variables.autoNumberId;
    let updatedNumber = await axiosInstance.put(requestURL, {
        autoNumber: autoGenNumber
    });
    return updatedNumber.data.data;
};

exports.createCase = async function(contactId, caseDetails) {
    axiosInstance.defaults.headers.common['contactid'] = contactId;
    let wireoutCase = await axiosInstance.post('/case',caseDetails);
    return wireoutCase.data.data;
}
