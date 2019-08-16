"use strict";

const stringifySafe = require("./stringifySafe");

const errorResponseHandler = (ctx, err) => {
  const {
    status,
    title = null,
    errors = null,
    request = {},
    data = {},
    statusText = null,
    message = null
  } = err;
  const instance =
    request && request.path !== undefined ? request.path : ctx.request.url;
  let errorTitle;

  switch (status) {
    case 400:
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.badRequest(null, errors || data.errors || statusText || message);
      break;
    case 401:
      ctx.log.fatal(stringifySafe(err, null, 2));
      ctx.response.unauthorized(null, {
        title: title || statusText || message || "Authentication Failed",
        instance
      });
      break;
    case 404:
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.notFound(null, {
        title: title || statusText || message,
        instance
      });
      break;
    case 409:
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.conflict(null, {
        title: title || statusText || message,
        instance
      });
      break;
    case 503:
      errorTitle =
        title ||
        statusText ||
        message ||
        (err.source !== undefined
          ? `${err.source} unavailable`
          : "Service unavailable");
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.serviceUnavailable(null, {
        title: errorTitle,
        instance
      });
      break;
    default:
      errorTitle =
        title ||
        statusText ||
        message ||
        (err.source !== undefined
          ? `${err.source} Internal Error`
          : "Internal Error");
      ctx.log.error(stringifySafe(err, null, 2));
      ctx.response.internalServerError(status, {
        title: errorTitle,
        instance
      });
  }
};

module.exports = errorResponseHandler;
