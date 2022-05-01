import express from "express";
import { Request, Response } from 'express';



const router =  express.Router();


router.get('/api/rentit', async (req: Request, res: Response) => {
    res.send({});

});


export { router as getAllRentitRouter };