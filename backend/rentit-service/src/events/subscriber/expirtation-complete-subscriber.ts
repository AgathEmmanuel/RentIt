import { ChannelName, ExpirationCompleteEvent, RentitStatus, Subscriber } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { Rentit } from "../../models/rentit";


export class ExpirationCompleteSubscriber extends Subscriber<ExpirationCompleteEvent> {
    queueGroupName = 'rentit-service';
    channelName: ChannelName.ExpirationComplete = ChannelName.ExpirationComplete;

    async runOnReceivingMessage(inputData: ExpirationCompleteEvent['inputData'],msg: Message): void {

        const rentitExpiringProduct = await Rentit.findById(inputData.rentitId);

        if (!rentitExpiringProduct) {
            throw new Error('the rentit product expiring not found');
        }
        
        rentitExpiringProduct.set({
            status: RentitStatus.RentitCancelled,
            product: null,
        })
    }
}
