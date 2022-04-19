import express, { Request, Response } from "express";
import { body } from 'express-validator';
// import { validationResult } from 'express-validator';
// import { RequestValidationError } from "../error/request-validation-error";
import { DatabaseConnectonError } from "../error/database-connection-error";
import { User } from "../models/user";
import { ExistingUserError } from "../error/existing-user-error";
import jwt from "jsonwebtoken";
import { requestValidater } from "../middleware/request-validater";

const router = express.Router();

router.post("/api/user/signup", [
    body('email').isEmail().withMessage("Email provided is not valid"),
    body('password').trim().isLength({ min:5, max:10 }).withMessage("Password must be >4 and <10")
],requestValidater,async(req: Request,res: Response) => {
    /*
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
        //throw new Error('Email, password Invalid');
        //return res.status(400).send(errors.array());
    }
    */
    // removing error validation inside the function and instead passing it as a middleware
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

    // generating a new jwt token for the user
    /*
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY in not availble as env variable')
    }
    */
    // adding the check to verify the precense of secretprivatekey at the 
    // start of the application in index.ts
    const newJWT = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_SECRET_KEY!);
    // ! add at the end of process.env.JWT_SECRET_KEY tells typescript
    // to not worry since we have already verified that the env is defined


    // storing jwt token on session object  
    // req.session.jwt = newJWT;
    // typedefinition file in cookiesession is not assuming that there is
    // an object req.session  so redefining the entire object 
    req.session = { jwt: newJWT };

    return res.status(201).send(user);

    throw new DatabaseConnectonError();
    //throw new Error('Connection to database failed')
    //res.send({});
});

export { router as signUpRouter };
