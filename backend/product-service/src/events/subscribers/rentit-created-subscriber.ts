import { ChannelName, RentitCreatedEvent, RentitStatus, Subscriber } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product";
//import { natsDriver } from "../../nats-driver";
import { ProductUpdatedPublisher } from "../publishers/product-updated-publisher";





export class RentitCreatedSubscriber extends Subscriber<RentitCreatedEvent> {
    channelName: ChannelName.RentitCreated = ChannelName.RentitCreated;
    queueGroupName = 'product-service';

    


    // we need to lock the product that got added to rentit servic or process
    // to prevent it from further getting rented

    async runOnReceivingMessage(inputData: RentitCreatedEvent['inputData'], msg: Message) {

        // find the product that got added by the rentit service



        const productAddedToRentit = await Product.findById(inputData.product.id);

        // if no product not found throw error 

        if (!productAddedToRentit) {
            throw new Error('Product not Found');
        }

        // mark product by setting its rentitId 

        productAddedToRentit.set({ rentitId: inputData.id });

        // save the product 

        await productAddedToRentit.save();



        // the subscriber should publish events to let
        // others know the changes made by him

        //new ProductUpdatedPublisher(natsDriver.stanCient);
        // add await to make sure this process gets done successfully
        // and if anything goes wrong it would throw an error
        // and would not go down to ack
        await new ProductUpdatedPublisher(this.stanSubClient).publisherPublish({
            id: productAddedToRentit.id,
            productName: productAddedToRentit.productName,
            productPrize: productAddedToRentit.productPrize,
            userId: productAddedToRentit.userId,
            rentitId: productAddedToRentit.id,
            version: productAddedToRentit.version,
        });

        // ack the message 

        msg.ack();




        
    }
}