"use strict";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const Koa = require("koa");
const config = require("./config");
const { responseHandler, requestId, errorResponseHandler, logger:logMiddleware} = require('http-helpers');
const logger = require("./logger");
const router = require("./routes");
const koaBody = require("koa-body");
const axiosHeaderInstance = require("./middlewares/axiosInstance");

const app = new Koa();
app.use(koaBody());

app.use(logMiddleware({ logger }));

// Add axios instance as globally
app.use(axiosHeaderInstance);

//Added http healpers in middleware
app.use(responseHandler())
    .use(requestId());
app.on('error', errorResponseHandler);

// Bootstrap application router
app.use(router.routes());
app.use(router.allowedMethods());

// Start server
if (!module.parent) {
    app.listen(config.port, config.ip, () => {
      console.log(
        `API server listening on ${config.host}:${config.port}, in ${config.env}`
      );
    });
 }
  
 // Expose app
module.exports = app;
