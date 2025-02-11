/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { RateLimiterMongo } from 'rate-limiter-flexible';
import { Connection } from 'mongoose'; // Ensure proper import

export let rateLimiterMongo: RateLimiterMongo | null = null;

const DURATION = 60; // seconds
const POINTS = 10; // number of requests
const BLOCKDURATION = 120

export const initRateLimiter = (mongooseConnection: Connection) => {
    rateLimiterMongo = new RateLimiterMongo({
        storeClient: mongooseConnection,
        points: POINTS, 
        duration: DURATION,
        blockDuration: BLOCKDURATION
    });
};
