import { loggedoffUserHandler } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from 'express';
import { Rentit } from "../models/rentit";


const router =  express.Router();




router.get('/api/rentit', loggedoffUserHandler, async (req: Request, res: Response) => {
    const rentitEnties = await Rentit.find({
        userId: req.currentUser!.id
    }).populate('product');
    res.send(rentitEnties);

});


export { router as getAllRentitRouter };