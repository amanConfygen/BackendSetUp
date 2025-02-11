import * as util from 'util';
import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';
import { MongoDBTransportInstance } from 'winston-mongodb';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import config from '../config.ts/config';
import { EApplicationEnvironment } from '../constants/application';
import path from 'path';
import * as soureceMapSupport from 'source-map-support'


soureceMapSupport.install()


const logFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    const customLevel = level.toUpperCase();
    const customTimestamp = typeof timestamp === 'string' ? timestamp : new Date().toISOString();
    const customMessage = String(message); // Ensure message is always a string

    // Ensure meta is properly formatted
    const customMeta =
        typeof meta === 'object' && Object.keys(meta || {}).length > 0
            ? util.inspect(meta, { showHidden: false, depth: null })
            : '';

    return `[${customTimestamp}] [${customLevel}] ${customMessage} META ${customMeta}`;
});


// Console transport for development
const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), logFormat),
            }),
        ];
    }
    return [];
};

const fileLogFormat = format.printf(({ level, message, timestamp, meta = {} }) => {
    let logeMeta: Record<string, unknown> = {};
    if (meta instanceof Error) {
        logeMeta = {
            name: meta.name,
            message: meta.message,
            stack: meta.stack || '',
        };
    } else if (typeof meta === 'object' && Object.keys(meta || {}).length > 0) {
        for (const [key, value] of Object.entries(meta || {})) {
            if (value instanceof Error) {
                logeMeta[key] = {
                    name: value.name,
                    message: value.message,
                    stack: value.stack || '',
                };
            } else {
                logeMeta[key] = value;
            }
        }
    }

    return JSON.stringify({ timestamp, level: level.toUpperCase(), message, meta: logeMeta }, null, 4);
});

// File transport for logging
const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
            level: 'info',
            format: format.combine(format.timestamp(), fileLogFormat), // JSON format for structured logs
        })
    ]
};

// MongoDB transport for logging
const mongoDBTransport = (): Array<MongoDBTransportInstance> => {
    if (config.DATABASE_URL) {
        return [
            new transports.MongoDB({
                level: 'info',
                db: config.DATABASE_URL, // Ensure this is a valid MongoDB connection string
                metaKey: 'meta', // Fix typo from `metakey` to `metaKey`
                expireAfterSeconds: 3600 * 24 * 30,
                options: { useUnifiedTopology: true },
                collection: 'application-logs'
            })
        ];
    }
    return [];
};


// Create logger safely
const logger = createLogger({
    // level: "info",
    defaultMeta: { meta: {} },
    transports: [...consoleTransport(), ...fileTransport(), ...mongoDBTransport()],
    // silent: config.ENV === EApplicationEnvironment.PRODUCTION, 
});

export default logger;

