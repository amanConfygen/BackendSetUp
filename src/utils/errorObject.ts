import { Request } from 'express';
import { THttpError } from '../types/types';
import responseMessage from '../constants/responseMessage';
import { EApplicationEnvironment } from '../constants/application';
import config from '../config.ts/config';


export default (
    err: Error | unknown,
    req: Request,
    errorStatusCode: number = 500
): THttpError => {
    const errorObject: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl || req.url,
        },
        message: err instanceof Error ? err.message : responseMessage.FINALERROR,
        data: null,
        trace: err instanceof Error && err.stack ? { error: err.stack } : null,
    };

    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete errorObject.request.ip;
        delete errorObject.trace;
    }

    return errorObject;
};
