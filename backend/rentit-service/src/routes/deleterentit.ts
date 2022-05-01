import express from "express";
import { Request, Response } from 'express';



const router =  express.Router();


router.delete('/api/rentit/:rentitId', async (req: Request, res: Response) => {
    res.send({});

});


export { router as deleteRentitRouter };