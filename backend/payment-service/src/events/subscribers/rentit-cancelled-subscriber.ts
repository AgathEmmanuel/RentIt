import { ChannelName, RentitStatus, Subscriber } from "@rentit/shared-custom-package";

import { RentitCancelledEvent } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { Rentit } from "../../models/rentit";


export class RentitCancelledSubscriber extends Subscriber<RentitCancelledEvent> {
    channelName: ChannelName.RentitCancelled = ChannelName.RentitCancelled;
    queueGroupName = 'payment-service';



    async runOnReceivingMessage(data: RentitCancelledEvent['inputData'],msg: Message) {
        const rentitGettingCancelled = await Rentit.findOne({
            _id: data.id,
            version: data.version - 1,

        });

        if (!rentitGettingCancelled) {
            throw new Error('Product getting Rentit cancelled not found');
        }
        rentitGettingCancelled.set({ status: RentitStatus.RentitCancelled });

        await rentitGettingCancelled.save();

        msg.ack();
    }
}