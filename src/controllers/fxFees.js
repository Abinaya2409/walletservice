"use strict";

const fxFeesModel = require("../models/fxFees");

exports.getFXFees = async function(ctx) {
    try {
        const fxFees = await fxFeesModel.getFXFees();
        ctx.response.success(fxFees, "Successfully fetched responses");
    } catch (error) {
      ctx.response.badRequest(null, error.message);
    }
};