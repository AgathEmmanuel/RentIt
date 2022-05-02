import { ProductUpdatedEvent, ChannelName, Subscriber } from '@rentit/shared-custom-package';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';




export class ProductUpdatedSubscriber extends Subscriber<ProductUpdatedEvent> {
    channelName: ChannelName.ProductUpdated=ChannelName.ProductUpdated;
    queueGroupName = 'rentit-service';


    async runOnReceivingMessage(inputData: ProductUpdatedEvent['inputData'], msg: Message) {

        //const rentitProductEntry = await Product.findById(inputData.id);
        const rentitProductEntry = await Product.findOne({
            _id: inputData.id,
            version: inputData.version-1


        });
        if (!rentitProductEntry) {
            throw new Error('Product not found')
        }

        const { productName, productPrize } = inputData;

        rentitProductEntry.set({ productName, productPrize });

        await rentitProductEntry.save();

        msg.ack();



    }


}