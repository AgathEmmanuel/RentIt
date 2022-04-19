import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../error/request-validation-error";

const router = express.Router();

router.post("/api/user/signin", [ 
    body('email').isEmail().withMessage('Must be a valid Email'),
    body('password').trim().notEmpty().withMessage("Password should not be empty"),
    ], (req: Request,res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
});
export { router as signInRouter };
