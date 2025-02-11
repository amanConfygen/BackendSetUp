
import config from '../config.ts/config';
import { rateLimiterMongo } from '../config.ts/rateLimiter';
import { EApplicationEnvironment } from '../constants/application';
import { Request, Response, NextFunction } from 'express';
import httpError from '../utils/httpError'
import responseMessage from '../constants/responseMessage';
export default async (req: Request, _: Response, next: NextFunction) => {
    if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return next();
    }

    if (rateLimiterMongo) {
        try {
            await rateLimiterMongo.consume(req.ip as string, 1); // Consume a point for the requester's IP
            return next();
        } catch (error) {
            if (error) {
                httpError(next, new Error(responseMessage.TOO_MANY_REQUEST), req, 429);
            }
        }
    }

    next(); // If rateLimiterMongo is not initialized, allow the request.
};
