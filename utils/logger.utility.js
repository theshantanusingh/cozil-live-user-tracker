const pino = require("pino");

const isDev = process.env.ENV !== "production";

const logger = pino({
    transport: isDev
        ? {
              target: "pino-pretty",
              options: {
                  colorize: true,
                  translateTime: "SYS:standard",
                  ignore: "pid,hostname",
              },
          }
        : undefined,
    level: isDev ? "debug" : "info",
});

module.exports = logger;