import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import httpError from '../utils/httpError';
export const validationMiddleware = (validator: (path: string) => Joi.ObjectSchema<unknown> | null) => {
    return (req: Request, _: Response, next: NextFunction) => {
        const schema = validator(req.path); // Get schema based on route

        if (!schema) {

            httpError(next, new Error('Validation schema not found for this route'), req, 400);
            return; // Ensure function execution stops
        }

        let data: Record<string, unknown> = req.body as Record<string, unknown>;
        if (req.method === 'GET') {
            data = Object.keys(req.params).length ? (req.params as Record<string, unknown>) : (req.query as Record<string, unknown>);
        }


        const { error } = schema.validate(data, { abortEarly: false });

        if (error) {
            httpError(next, error, req, 400);
            return; // Ensure function execution stops
        }

        next();
    };
};
