import { body, ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules
export const createBookValidation: ValidationChain[] = [
  body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name is required'),
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
