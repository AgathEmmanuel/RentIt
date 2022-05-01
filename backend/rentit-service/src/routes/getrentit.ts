import express from "express";
import { Request, Response } from 'express';



const router =  express.Router();


router.get('/api/rentit/:rentitId', async (req: Request, res: Response) => {
    res.send({});

});


export { router as getRentitRouter };