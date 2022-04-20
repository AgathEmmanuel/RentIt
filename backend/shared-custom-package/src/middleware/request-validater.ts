import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../error/request-validation-error'


export const requestValidater = (req: Request, res: Response, next: NextFunction) => {
    const errorsOccured = validationResult(req);
    if (!errorsOccured.isEmpty()) {
        throw new RequestValidationError(errorsOccured.array());
    }
    next();
}