import { loggedoffUserHandler, NotLoggedInError, routeNotFoundError } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from 'express';
import { Rentit } from "../models/rentit";


const router =  express.Router();


router.get('/api/rentit/:rentitId', loggedoffUserHandler, async (req: Request, res: Response) => {
    const rentitEntry = await Rentit.findById(req.params.rentitId).populate('product');

    if (!rentitEntry) {
        throw new routeNotFoundError();
    }

    if (rentitEntry.userId !== req.currentUser!.id) {
        throw new NotLoggedInError();
    }

    res.send(rentitEntry);
});


export { router as getRentitRouter };
