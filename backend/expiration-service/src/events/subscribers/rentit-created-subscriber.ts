import { ChannelName, RentitCreatedEvent, Subscriber } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";



export class RentitCreatedSubscriber extends Subscriber<RentitCreatedEvent> {
    channelName: ChannelName.RentitCreated=ChannelName.RentitCreated;
    queueGroupName= 'expiration-service';

    async runOnReceivingMessage(inputData: RentitCreatedEvent['inputData'],msg: Message) {

        const delay = new Date(inputData.expiresAt).getTime() - new Date().getTime();

        console.log('Waiting to process the job for a delay of:',delay);

        await expirationQueue.add({
            rentitId: inputData.id
        },
        {
            //delay: 1000, 
            //delay: 10000, //delay in 10s
            delay,
        });


        msg.ack();
    }
}



