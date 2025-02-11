import { Request, Response} from 'express';
import { THttpError } from '../types/types';

export default (err: THttpError, _: Request, res: Response) => {
    res.status(err.statusCode).json(err);
};
