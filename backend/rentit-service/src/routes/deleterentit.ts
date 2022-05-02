import { loggedoffUserHandler, NotLoggedInError, RentitStatus, routeNotFoundError } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from 'express';
import { RentitCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Rentit } from "../models/rentit";
import { natsDriver } from "../nats-driver";




const router =  express.Router();


router.delete('/api/rentit/:rentitId',loggedoffUserHandler, async (req: Request, res: Response) => {
    const { rentidId } = req.params;
    

    const rentitEntry = await Rentit.findById(rentidId).populate('product');

    if (!rentitEntry) {
        throw new routeNotFoundError();
    }
    if (rentitEntry.userId !== req.currentUser!.id) {
        throw new NotLoggedInError();
    }

    rentitEntry.status = RentitStatus.RentitCancelled;
    await rentitEntry.save();



    // pusblishing rentit cancelled event

    new RentitCancelledPublisher(natsDriver.stanCient).publisherPublish({
        id: rentitEntry.id,
        product: {
            id: rentitEntry.rentit.id
            
        }
    })

    res.status(204).send(rentitEntry);

});


export { router as deleteRentitRouter };