import { loggedoffUserHandler, requestValidater } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from 'express';
import { body } from "express-validator";
import mongoose from "mongoose";

import { Rentit } from "../models/rentit";


const router =  express.Router();


router.post('/api/rentit', loggedoffUserHandler, [
    body('rentitId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        // to validate if the id is a valid mongodb id 
        .withMessage('rentidId must be provided')
], requestValidater, async (req: Request, res: Response) => {
    res.send({});

});


export { router as createRentitRouter };