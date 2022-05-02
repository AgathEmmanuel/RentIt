import { ExistingUserError, loggedoffUserHandler, NotLoggedInError, requestValidater, routeNotFoundError } from '@rentit/shared-custom-package';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Product } from '../models/product';
import { natsDriver } from '../nats-driver';


import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';



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

        if (product.rentitId) {
            throw new ExistingUserError('The product is being rented by the rentit service');
        }

        if (product.userId !== req.currentUser!.id) {
            throw new NotLoggedInError();
        }

        product.set({
            productName: req.body.productName,
            productPrize: req.body.productPrize
        });
        await product.save();

        new ProductUpdatedPublisher(natsDriver.stanCient).publisherPublish({
            id: product.id,
            productName: product.productName,
            productPrize: product.productPrize,
            userId: product.userId,
            version: product.version
        });
        // in the ProductCreatedPublisher we used await keyword with new
        // in the case of updated we did not use an await keyword 
        // that means instantly after this line of code runs the data
        // res.send will sent the data to the user
        // and no errors wrt to publishing event to nats will be throwns since thats the case
        // So adding await will definetly add some latency to the request
        // but weather its needed will depend on the critcality of the business requirement
        // for that event


        res.send(product);
    }


);


export { router as updateProductRouter };
