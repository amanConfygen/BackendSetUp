/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import mongoose from 'mongoose';
import config from '../config.ts/config';
import logger from '../utils/logger';
import { initRateLimiter } from '../config.ts/rateLimiter';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(config.DATABASE_URL as string);
        logger.info('DATABASE_CONNECTED', {
            meta: {
                CONNECTION_NAME: connection.connection.name
            }
        });
        initRateLimiter(connection.connection)
        logger.info('RATE_LIMITER_INITIATED');
    } catch (error) {
        logger.error('DATABASE_NOT_CONNECTED', {
            meta: { error }
        });
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
