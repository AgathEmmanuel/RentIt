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
        const product = Product.createProduct({
            productName,
            productPrize,
            userId: req.currentUser!.id
        });
        await product.save();
    console.log('create product post /api/product log',product)
    res.status(201).send(product);
    //res.sendStatus(201).send(product);
    //https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
    //"Error: Can't set headers after they are sent." means that you're already in the Body or Finished state, but some function tried to set a header or statusCode. When you see this error, try to look for anything that tries to send a header after some of the body has already been written. 
    //res.send(product);
    // this small change in using sendStatus   instead  of  status
    // was causing issues including
    // proper response not being sent
    // and cant set header after thery are send


});


export { router as createProductRouter }


