import { loggedoffUserHandler, NotLoggedInError, RentitStatus, routeNotFoundError } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from 'express';
import { Rentit } from "../models/rentit";




const router =  express.Router();


router.delete('/api/rentit/:rentitId',loggedoffUserHandler, async (req: Request, res: Response) => {
    const { rentidId } = req.params;
    
    const rentitEntry = await Rentit.findById(rentidId);

    if (!rentitEntry) {
        throw new routeNotFoundError();
    }
    if (rentitEntry.userId !== req.currentUser!.id) {
        throw new NotLoggedInError();
    }

    rentitEntry.status = RentitStatus.RentitCancelled;
    await rentitEntry.save();


    res.status(204).send(rentitEntry);

});


export { router as deleteRentitRouter };