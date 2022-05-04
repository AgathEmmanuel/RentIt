import { ExistingUserError, loggedoffUserHandler, NotLoggedInError, RentitStatus, requestValidater, routeNotFoundError } from "@rentit/shared-custom-package";
import express from "express";
import { Request, Response } from "express";


import { body } from "express-validator";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";
import { Payment } from "../models/payment";
import { Rentit } from "../models/rentit";
import { natsDriver } from "../nats-driver";


import { stripe } from "../stripe";


const router = express.Router();


router.post('/api/payment', loggedoffUserHandler,
            [
                body('token')
                .not()
                .isEmpty(),
                body('rentitId')
                .not()
                .isEmpty()
            ],
            requestValidater,
            async (req: Request, res: Response) => {
             //res.send({ paymentSuccessfull: true });
             const { token, rentitId } = req.body;

             const rentitProductEntry = await Rentit.findById(rentitId);
             if(!rentitProductEntry) {
                 throw new routeNotFoundError(); 

             }

             // check if the user who is trying to pay has the 
             // same userId property in the rentitProduct

             if (rentitProductEntry.userId !== req.currentUser!.id) {
                 throw new NotLoggedInError();
             }

             // make sure the order is not yet cancelled

             if (rentitProductEntry.status === RentitStatus.RentitCancelled) {
                 throw new ExistingUserError('The renting of the product is in cancelled state');

             }
             


             // charge the user his rent using strpe api

             /*
             const charge = await stripe.charges.create({
                 currency: 'usd',
                 amount: 2000,
                 // amount: rentitProductEntry.productPrize * 100, 
                 // converting into cents 
                 source: token,
                 description: 'Test payment'

             });

             */
             
             const charge = {
              "id": "ch_justTestingOutWithADummyCharge",
              "object": "charge",
              "amount": 2000,
              "source": "tok_visa"
            }


             // we ideally should get charge id in response from stripe
             const payment = Payment.build({
                 rentitId,
                 stripeId: charge.id
             });

             await payment.save();

             await new PaymentCreatedPublisher(natsDriver.stanCient).publisherPublish({
                 id: payment.id,
                 rentitId: payment.rentitId,
                 stripeId: payment.stripeId
             });

             //res.send({ paymentSuccessfull: true });
             //res.status(201).send({ paymentSuccessfull: true });
             res.status(201).send({ id: payment.id });

});





export { router as createPaymentRouter };