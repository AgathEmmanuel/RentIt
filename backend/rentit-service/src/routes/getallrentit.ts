import { loggedoffUserHandler } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from 'express';
import { Rentit } from "../models/rentit";


const router =  express.Router();




router.get('/api/rentit', loggedoffUserHandler, async (req: Request, res: Response) => {
    const rentitEntries = await Rentit.find({
        userId: req.currentUser!.id
    }).populate('product');
    res.send(rentitEntries);

});


export { router as getAllRentitRouter };