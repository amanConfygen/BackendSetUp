import Joi from 'joi';

// Common validation types
export const requiredString = (min: number, max: number) => Joi.string().min(min).max(max).required();
export const optionalString = (min: number, max: number) => Joi.string().min(min).max(max).optional();
export const emailValidation = () => Joi.string().email().required();
export const optionalNumber = () => Joi.number().optional();
export const requiredNumber = () => Joi.number().required();
export const requiredBoolean = () => Joi.boolean().required();
export const optionalBoolean = () => Joi.boolean().optional();
export const passwordValidation = (min: number, max: number) => Joi.string().min(min).max(max).required();
export const confirmPasswordValidation = () => Joi.string().valid(Joi.ref('password')).required();
export const mobNo = () => Joi.string().pattern(/^[0-9]{10}$/).required();
