import express, { Request, Response } from "express";
import { body } from "express-validator";
//import { validationResult } from "express-validator";
//import { RequestValidationError } from "../error/request-validation-error";
import { requestValidater } from "../middleware/request-validater";
import { User } from "../models/user";
import { ExistingUserError } from "../error/existing-user-error";
import { Password } from "../password-hasher";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/user/signin", [ 
    body('email').isEmail().withMessage('Must be a valid Email'),
    body('password').trim().notEmpty().withMessage("Password should not be empty"),
    ], requestValidater, async (req: Request,res: Response) => {
    /*
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }
    */
    // removing error validation inside the function and instead passing it as a middleware


    const { email, password } = req.body;
    const signedUpUser = await User.findOne({email});
    if (!signedUpUser) {
        throw new ExistingUserError("The credential are invalide");
    }
    const passwordStatus = await Password.comparePassword(signedUpUser.password, password);
    if (!passwordStatus) {
        throw new ExistingUserError("The credential are invalide");
    }

    const newJWT = jwt.sign({
        id: signedUpUser.id,
        email: signedUpUser.email
    }, process.env.JWT_SECRET_KEY!);

    req.session = { jwt: newJWT };

    return res.status(200).send(signedUpUser);

});

export { router as signInRouter };
