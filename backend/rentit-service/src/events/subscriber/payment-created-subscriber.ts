import { ChannelName, RentitStatus, Subscriber } from "@rentit/shared-custom-package";

import { PaymentCreatedEvent } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { Rentit } from "../../models/rentit";


export class PaymentCreatedSubscriber extends Subscriber<PaymentCreatedEvent> {
    channelName: ChannelName.PaymentCreated = ChannelName.PaymentCreated;
    queueGroupName = 'payment-service';

       
    async runOnReceivingMessage(inputData: PaymentCreatedEvent['inputData'], msg: Message) {
        const rentitPaymentCreated = await Rentit.findById(inputData.rentitId);

        if (!rentitPaymentCreated) {
            throw new Error(' Rentit with payment done not found');

        }

        rentitPaymentCreated.set({
            status: RentitStatus.RentitComplete
        });

        await rentitPaymentCreated.save();

        msg.ack();
        
         
   }
}