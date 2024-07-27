import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules
export const createUpdateUserValidation: ValidationChain[] = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
];

// Validation rules
export const returnBookValidation: ValidationChain[] = [
  body('score').isInt().withMessage('Score must be an integer').notEmpty().withMessage('Score is required'),
];

// Middleware to validate requests
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};
