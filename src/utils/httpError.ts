import { NextFunction, Request } from 'express';
import errorObject from './errorObject';
import logger from './logger';

export default function errorHandler(
    next: NextFunction,
    err: Error | unknown,
    req: Request,
    errorStatusCode: number = 500
): void {
    const errorObj = errorObject(err, req, errorStatusCode);
    logger.error('REQUEST_ERROR', {
        message: errorObj.message || 'An unexpected error occurred',
        meta: {
            PATH: req.path,
            METHOD: req.method,
            STATUS_CODE: errorStatusCode,
            ERROR_NAME: err instanceof Error ? err.name : err,
            ERROR_MESSAGE: err instanceof Error ? err.message : err,
            STACK: err instanceof Error ? err.stack : undefined,
        }
    });

    next(errorObj);
}
