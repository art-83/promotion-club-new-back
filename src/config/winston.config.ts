import winston from "winston";

const { combine, printf } = winston.format;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: combine(printf((info) => String(info.message))),
    }),
  ],
});

export default logger;
