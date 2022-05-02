import { ExistingUserError, loggedoffUserHandler, RentitStatus, requestValidater, RequestValidationError, routeNotFoundError } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from 'express';
import { body } from "express-validator";
import mongoose from "mongoose";
import { RentitCreatedPublisher } from "../events/publishers/order-created-publisher";
import { Product } from "../models/product";

import { Rentit } from "../models/rentit";
import { natsDriver } from "../nats-driver";


const router =  express.Router();


const EXPIRATION_TIME_SECONDS = 20;


router.post('/api/rentit', loggedoffUserHandler, [
    body('rentitId')
        .not()
        .isEmpty()
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        // to validate if the id is a valid mongodb id 
        .withMessage('rentidId must be provided')
], requestValidater, 
    async (req: Request, res: Response) => {

        const { productId } = req.body;

        // find product user is trying to Rent from the database

        const  productBeingRented = await Product.findById(productId);

        if (!productBeingRented) {{
            throw new routeNotFoundError();

        }}

        const isBeingRentedOutVar = await productBeingRented.isBeingRentedOut();

        if (isBeingRentedOutVar) {
            throw new ExistingUserError('Product is already being rented out');
        }

        // check if the product is going through a rentit process 

        // for doing so look for the all products in rentit database 
        
        // find a entry in rentit database with the specific produc
        // and the status of the entry should be not cancelled
        // if the product is there in the rentit database that means
        // tht product is being rented out to a customer

        const rentitExisting = await Rentit.findOne({
            product: productBeingRented,
            status: {
                $in: [
                    RentitStatus.RentitCreated,
                    RentitStatus.RentitAwaitingPayment,
                    RentitStatus.RentitComplete
                ]
            }

        });



        if (rentitExisting) {
            throw new ExistingUserError('The product is being rented out to other user');

        }



        // calculate expiration data for the rentit process 
        
        const expiration = new Date();
        expiration.setSeconds(expiration.getSeconds() + EXPIRATION_TIME_SECONDS)
        //expiration.setSeconds(expiration.getSeconds() + 20*60)
        // for 20 minutes


        // build the rental  and save to database

        const rentitEntry = Rentit.build({
            userId: req.currentUser!.id,
            status: RentitStatus.RentitCreated,
            expiresAt: expiration,
            rentit: productBeingRented
        });

        await rentitEntry.save();
        // publish event saying the product was rented out

        new RentitCreatedPublisher(natsDriver.stanCient).publisherPublish({
            id: rentitEntry.id,
            status: rentitEntry.status,
            userId: rentitEntry.userId,
            expiresAt: rentitEntry.expiresAt.toISOString(),
            product: {
                id: productBeingRented.id,
                productPrize: productBeingRented.productPrize
            
            }
        })
    res.status(201).send(rentitEntry);

});


export { router as createRentitRouter };