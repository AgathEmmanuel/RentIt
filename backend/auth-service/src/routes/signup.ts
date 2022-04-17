import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectonError } from "../error/database-connection-error";
import { User } from "../models/user";
import { ExistingUserError } from "../error/existing-user-error";

const router = express.Router();

router.post("/api/user/signup", [
    body('email').isEmail().withMessage("Email provided is not valid"),
    body('password').trim().isLength({ min:5, max:10 }).withMessage("Password must be >4 and <10")
],async(req: Request,res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
        //throw new Error('Email, password Invalid');
        //return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;


    console.log('Creating user');

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ExistingUserError('Email in already used');
        //console.log('Email already present');
        //return res.send({});
    }

    const user = User.createUser({ email, password })

    await user.save();
    res.status(201).send(user);

    throw new DatabaseConnectonError();
    //throw new Error('Connection to database failed')
    //res.send({});
});

export { router as signUpRouter };