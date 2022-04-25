import { loggedoffUserHandler, NotLoggedInError, requestValidater, routeNotFoundError } from '@rentit/shared-custom-package';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../models/product';



const router = express.Router();


router.put('/api/product/:id', 
    loggedoffUserHandler,
    [
        body('productName')
          .not()
          .isEmpty()
          .withMessage('Product name is needed'),
        body('productPrize')
          .isFloat({ gt: 0 })
          .withMessage('Product prize is not valid'),
    ],
    requestValidater,
    async (req: Request, res: Response) => {

        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new routeNotFoundError();
        }

        if (product.userId !== req.currentUser!.id) {
            throw new NotLoggedInError();
        }

        product.set({
            productName: req.body.productName,
            productPrize: req.body.productPrize
        });
        await product.save();

        res.send(product);
    }


);


export { router as updateProductRouter };
