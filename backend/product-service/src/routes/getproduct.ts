import { routeNotFoundError } from '@rentit/shared-custom-package';
import express, { Request, Response } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/product/:id', async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    console.log('get product get /api/product log',product)
    if (!product) {
        throw new routeNotFoundError();
    }

    res.send(product);

});

export { router as getProductRouter };
