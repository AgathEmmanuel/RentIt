import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectonError } from "../error/database-connection-error";

const router = express.Router();

router.post("/api/user/signup", [
    body('email').isEmail().withMessage("Email provided is not valid"),
    body('password').trim().isLength({ min:5, max:10 }).withMessage("Password must be >4 and <10")
],(req: Request,res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
        //throw new Error('Email, password Invalid');
        //return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;


    console.log('Creating user');
    throw new DatabaseConnectonError();
    //throw new Error('Connection to database failed')
    res.send({});
});

export { router as signUpRouter };
