import { ChannelName, Subscriber } from "@rentit/shared-custom-package";

import { RentitCancelledEvent } from "@rentit/shared-custom-package";
import { Message } from "node-nats-streaming";
import { Product } from "../../models/product";
import { ProductUpdatedPublisher } from "../publishers/product-updated-publisher";


export class RentitCancelledSubscriber extends Subscriber<RentitCancelledEvent> {
    channelName: ChannelName.RentitCancelled = ChannelName.RentitCancelled;
    queueGroupName = 'product-service';

    async runOnReceivingMessage(inputData: RentitCancelledEvent['inputData'], msg: Message) {
        const productCancelledFromRentit = await Product.findById(inputData.product.id);

        if (!productCancelledFromRentit) {
            throw new Error('Cancelled product not found');
            
        }
        

        productCancelledFromRentit.set({ rentitId: undefined });

        await productCancelledFromRentit.save();


        await new ProductUpdatedPublisher(this.stanSubClient).publisherPublish({
            id: productCancelledFromRentit.id,
            rentitId: productCancelledFromRentit.rentitId,
            userId: productCancelledFromRentit.userId,
            productPrize: productCancelledFromRentit.productPrize,
            productName: productCancelledFromRentit.productName,
            version: productCancelledFromRentit.version

        });

        msg.ack();
        


         
    }
}
