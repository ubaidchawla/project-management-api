const { createLogger, format, transports } = require("winston");

const level = process.env.LOG_LEVEL || "debug";

function formatParams(info) {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace("T", " ");

    return `${ts} ${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, "", "")
        : ""}`;
}

const developmentFormat = format.combine (
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
);

const productionFormat = format.combine (
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
);

let winstonLogger;

winstonLogger = createLogger ({
    level: level,
    format: developmentFormat,
    transports: [
        new transports.File({ filename: "logs/error.log", level: "error" }),
        new transports.Console()
    ]
});

exports.error = (error) => {
    winstonLogger.error(error.message);
}
exports.debug = (message) => {
    winstonLogger.debug(message);
}
exports.info = (message) => {
    winstonLogger.info(message);
}
