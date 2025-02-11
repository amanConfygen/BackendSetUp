import { Request, Response, NextFunction } from 'express';
import httpResponse from '../utils/httpResponse';
import httpError from '../utils/httpError';
import responseMessage from '../constants/responseMessage';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (error) {
            httpError(next, error, req, 500)
        }

    },

}