const pino = require("pino");


/**
 *
 * @description This is used to create the logger Configuration
 */
const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});



module.exports = logger;