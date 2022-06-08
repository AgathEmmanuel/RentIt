import { routeNotFoundError } from '@rentit/shared-custom-package';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';


const router = express.Router();

router.get('/api/product', async (req: Request, res: Response) => {
    //const products = await Product.find({});
    const products = await Product.find({
        rentitId: undefined
    });
    res.send(products)

})


export { router as getAllProductRouter };