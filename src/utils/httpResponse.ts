import { Request, Response } from 'express';
import { THttpResponse } from '../types/types';
import config from '../config.ts/config';
import { EApplicationEnvironment } from '../constants/application';

export default (req: Request, res: Response, responseStatscode: number, responseMessage: string, data: unknown = null): void => {
    const response: THttpResponse = {
        success: true,
        statusCode: responseStatscode,
        request: {
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl
        },
        message: responseMessage,
        data: data
    }
    // console.info('CONTROLLER_RESPONSE', { meta: response })
    if (config.ENV === EApplicationEnvironment.PRODUCTION) {
        delete response.request.ip
    }
    res.status(responseStatscode).json(response)
}


