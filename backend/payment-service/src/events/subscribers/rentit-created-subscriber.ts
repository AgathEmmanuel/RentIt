import { ChannelName, RentitStatus, Subscriber } from "@rentit/shared-custom-package";

import { RentitCreatedEvent } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { Rentit } from "../../models/rentit";




export class RentitCreatedSubscriber extends Subscriber<RentitCreatedEvent> {
    channelName: ChannelName.RentitCreated = ChannelName.RentitCreated;
    queueGroupName = 'payment-service';

    async runOnReceivingMessage(inputData: RentitCreatedEvent['inputData'], msg: Message) {
        const rentitWaitingPayment = Rentit.build({
            id: inputData.id,
            productPrize: inputData.product.productPrize,
            status: inputData.status,
            userId: inputData.userId,
            version: inputData.version
        })


        await rentitWaitingPayment.save();


        msg.ack();
        
    }
}