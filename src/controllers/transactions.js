"use strict";

const transactionsModel = require("../models/transactions");

exports.getTransactions = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    try {
        const transactions = await transactionsModel.getTransactions(contactId);
        ctx.response.success(transactions, "Successfully fetched responses");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

exports.getTransactionsbyWallet = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    const financialAccountId = ctx.params.faid;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    if(!financialAccountId){
        ctx.response.badRequest(null, 'Wallet Id is required');
        return;
    }
    try {
        const transaction = await transactionsModel.getTransactionsbyWallet(contactId, financialAccountId);
        ctx.response.success(transaction, "Successfully fetched responses");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};