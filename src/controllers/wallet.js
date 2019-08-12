"use strict";

const walletModel = require("../models/wallet");

exports.getWallets = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    try {
        const wallets = await walletModel.getWallets(contactId);
        ctx.response.success(wallets, "Successfully fetched responses");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

exports.getWallet = async function(ctx) {
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
        const wallets = await walletModel.getWallet(contactId, financialAccountId);
        ctx.response.success(wallets, "Successfully fetched responses");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

exports.walletTransfer = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    const {fromAccount, toAccount, fromAmount, toAmount} = ctx.request.body;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    if(!fromAccount && !toAccount && !fromAmount && !toAmount){
        ctx.response.badRequest(null, 'Please provide necessary details');
        return;
    }
    try {
        var fromWallet = await walletModel.getWallet(contactId, fromAccount);
        var toWallet = await walletModel.getWallet(contactId, toAccount);
        if(fromWallet.new_withdrawalbalances<fromAmount){
            ctx.response.badRequest(null, 'You don\'t have the sufficient balance');
            return;
        }
        //balance update
        var updateFromBalance = await walletModel.updateWalletBalance(fromAccount, fromWallet.new_withdrawalbalances-fromAmount);
        var updateToBalance = await walletModel.updateWalletBalance(toAccount, toWallet.new_withdrawalbalances+toAmount);
        // create transaction debit credit entry
        var autoGenNumber = await walletModel.getAutoGenNumber();
        var transactionId = autoGenNumber.new_transactionidreference;
        var updatedNumber = await walletModel.updateAutoGenNumber(transactionId+8);
        var fromTransactionDetails = {
            transactionType : 1,
            transactionAmount : fromAmount,
            transactionDescription : 'wallet to wallet',
            transactionId : transactionId
        };
        var toTransactionDetails = {
            transactionType : 0,
            transactionAmount : toAmount,
            transactionDescription : 'wallet to wallet',
            transactionId : transactionId+4
        };
        var fromDebitEntry = await walletModel.createTransactions(contactId, fromAccount, fromTransactionDetails);
        var toCreditEntry = await walletModel.createTransactions(contactId, toAccount, toTransactionDetails);
        ctx.response.success(null, "Successfully transfered between wallets");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

exports.walletWireout = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    const {fromAccount, fromAmount, toAmount, beneficiaryId} = ctx.request.body;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    if(!fromAccount || !fromAmount || !beneficiaryId){
        ctx.response.badRequest(null, 'Please provide necessary details');
        return;
    }
    try {
        var fromWallet = await walletModel.getWallet(contactId, fromAccount);
        if(fromWallet.new_withdrawalbalances<fromAmount){
            ctx.response.badRequest(null, 'You don\'t have the sufficient balance');
            return;
        }
        //balance update
        var updateFromBalance = await walletModel.updateWalletBalance(fromAccount, fromWallet.new_withdrawalbalances-fromAmount);
        // create transaction debit credit entry
        var autoGenNumber = await walletModel.getAutoGenNumber();
        var transactionId = autoGenNumber.new_transactionidreference;
        var updatedNumber = await walletModel.updateAutoGenNumber(transactionId+4);
        var fromTransactionDetails = {
            transactionType : 1,
            transactionAmount : fromAmount,
            transactionDescription : 'wallet to wireout',
            transactionId : transactionId
        };
        var fromDebitEntry = await walletModel.createTransactions(contactId, fromAccount, fromTransactionDetails);
        var caseDetails = {
            "Account" : fromAccount,
            "wireoutRequestAmount" : fromAmount,
             "wireoutAmount" : toAmount,
             "beneficiaryDetails" : beneficiaryId
        }
        var createCase = await walletModel.createCase(contactId, caseDetails);
        ctx.response.success(null, "Successfully initiated wireout");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

