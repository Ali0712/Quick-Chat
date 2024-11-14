import { body, param, validationResult } from 'express-validator';
import httpResponse from './httpResponse.js';

export const validate = (method) => {
    switch (method) {
        case 'register': {
        return [
            body('email', 'Invalid email').exists().isEmail(),
            body('password', 'Invalid password').exists().isLength({ min: 6 }),
            body('fullName', 'Invalid name').exists().isString(),
            body('gender', 'Invalid gender').exists().isString(),
            body('confirmPassword', 'Invalid confirm password').exists().isString(),
        ];
        }
        case 'login': {
        return [
            body('email', 'Invalid email').exists().isEmail(),
            body('password', 'Invalid password').exists().isLength({ min: 6 }),
        ];
        }
        case 'message': {
        return [
            param('id', 'Invalid id').exists().isString(),
            body('message', 'Invalid message').exists().isString(),
        ];
        }
    }
};  

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return httpResponse.badRequestResponse(res, errors.array()[0].msg);
    }
    next();
};