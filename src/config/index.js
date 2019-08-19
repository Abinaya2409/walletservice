"use strict";

const env = process.env.NODE_ENV || "development";

const configs = {
  base: {
    env,
    host: process.env.APP_HOST || "localhost",
    port: process.env.APP_PORT || 8082
  },
  production: {
    logger: {
      name: "chat-services",
      streams: [
        {
          type: "stream",
          stream: process.stdout,
          level: "debug"
        }
      ]
    }
  },
  development: {
    logger: {
      name: "chat-services",
      streams: [
        {
          type: "stream",
          stream: process.stdout,
          level: "debug"
        }
      ]
    }
  },
  test: {
    logger: {
      name: "chat-services-test",
      streams: []
    }
  }
};

const config = Object.assign(configs.base, configs[env]);

module.exports = config;
