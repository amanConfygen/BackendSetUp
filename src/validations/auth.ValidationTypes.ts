import Joi from 'joi';
import { emailValidation, requiredString } from './joiValidationTypes';

export const authValidationSchema = (path: string): Joi.ObjectSchema<unknown> | null => {
    switch (path) {
        case '/logina':
            return Joi.object({
                email: emailValidation(),
                password: requiredString(1, 50),
            });
        default:
            return null; // Return null if no validation is required
    }
};
