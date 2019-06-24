import { createLogger, format, transports } from "winston";
import { debugLevel } from "../config";

const logger = createLogger({
    level: debugLevel,
    format: format.combine(
        format.colorize(),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [new transports.Console()]
});

export default logger;