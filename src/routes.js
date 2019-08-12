"use strict";

const Router = require("koa-router");

const router = new Router();

const walletController = require("./controllers/wallet");
const transactionsController = require("./controllers/transactions");
const beneficiaryController = require("./controllers/beneficiary");
const fxFeesController = require("./controllers/fxFees");

//Wallet
router.get("/wallet",  walletController.getWallets);
router.get("/wallet/:faid",  walletController.getWallet);
router.post("/wallet/transfer",  walletController.walletTransfer);
router.post("/wallet/wireout",  walletController.walletWireout);

//Transactions
router.get("/transactions",  transactionsController.getTransactions);
router.get("/wallet/:faid/transactions",  transactionsController.getTransactionsbyWallet);

//Beneficiary
router.get("/beneficiary", beneficiaryController.getBeneficiaries);
router.get("/beneficiary/:bid", beneficiaryController.getBeneficiary);
router.post("/beneficiary", beneficiaryController.createBeneficiary);
router.get("/beneficiary-requirement/:countryCode/:currencyCode",  beneficiaryController.getBeneficiaryRequirement);

// FX margin
router.get("/fx-fees", fxFeesController.getFXFees);

module.exports = router;