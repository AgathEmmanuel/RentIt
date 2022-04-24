import { loggedoffUserHandler, requestValidater } from '@rentit/shared-custom-package';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../models/product';

const router = express.Router();


router.post('/api/product', loggedoffUserHandler, [
    body('productName')
      .not()
      .isEmpty()
      .withMessage('Product name should be specified'),
    body('productPrize')
      .isFloat({ gt: 0 })
      .withMessage('Product Prize must be greater that 0')
    ], requestValidater,
    async (req: Request, res: Response) => {
        const { productName, productPrize } = req.body;
        const product = Product.build({
            productName,
            productPrize,
            userId: req.currentUser!.id
        });
        await product.save();
    res.sendStatus(201).send(product);

});


export { router as createProductRouter }


