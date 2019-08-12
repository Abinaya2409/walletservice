"use strict";

const beneficiaryModel = require("../models/beneficiary");

exports.getBeneficiaries = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    try {
        const beneficiaries = await beneficiaryModel.getBeneficiaries(contactId);
        ctx.response.success(beneficiaries, "Successfully fetched responses");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

exports.getBeneficiary = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    const beneficiaryId = ctx.params.bid;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    if(!beneficiaryId){
        ctx.response.badRequest(null, 'Beneficiary Id is required');
        return;
    }
    try {
        const beneficiary = await beneficiaryModel.getBeneficiary(contactId, beneficiaryId);
        ctx.response.success(beneficiary, "Successfully fetched responses");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

exports.createBeneficiary = async function(ctx) {
    const contactId = ctx.request.headers.contactid;
    const beneficiaryData = ctx.request.body;
    if(!contactId){
        ctx.response.badRequest(null, 'Contact ID is required');
        return;
    }
    try {
        const beneficiary = await beneficiaryModel.createBeneficiary(contactId, beneficiaryData);
        ctx.response.success(beneficiary, "Successfully created beneficiary");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};

exports.getBeneficiaryRequirement = async function(ctx) {
    const {countryCode, currencyCode} = ctx.params;
    try {
        const beneficiaryRequirement = await beneficiaryModel.getBeneficiaryRequirement(countryCode, currencyCode);
        ctx.response.success(beneficiaryRequirement, "Successfully fetched beneficiary requirement");
    } catch (error) {
        ctx.app.emit('error', ctx, error.response || error);
    }
};
