import { ChannelName, ExpirationCompleteEvent, RentitStatus, Subscriber } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { Rentit } from "../../models/rentit";
import { RentitCancelledPublisher } from "../publishers/rentit-cancelled-publisher";




export class ExpirationCompleteSubscriber extends Subscriber<ExpirationCompleteEvent> {
    queueGroupName = 'rentit-service';
    channelName: ChannelName.ExpirationComplete = ChannelName.ExpirationComplete;

    async runOnReceivingMessage(inputData: ExpirationCompleteEvent['inputData'],msg: Message) {

        const rentitExpiringProduct = await Rentit.findById(inputData.rentitId).populate('product');

        if (!rentitExpiringProduct) {
            throw new Error('the rentit product expiring not found');
        }
        
        // to check for rentit product thats already been payed for..
        if (rentitExpiringProduct.status == RentitStatus.RentitComplete) {
            return msg.ack();
        }
        rentitExpiringProduct.set({
            status: RentitStatus.RentitCancelled,
            //product: null,
        });

        await rentitExpiringProduct.save();

        await new RentitCancelledPublisher(this.stanSubClient).publisherPublish({
            id: rentitExpiringProduct.id,
            version: rentitExpiringProduct.version,
            product: {
                id: rentitExpiringProduct.product.id
            }

        });

        msg.ack();
    }
}
