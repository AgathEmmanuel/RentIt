import { ProductCreatedEvent, ChannelName, Subscriber } from '@rentit/shared-custom-package';
import { Message } from 'node-nats-streaming';
import { Product } from '../../models/product';



export class ProductCreatedSubscriber extends Subscriber<ProductCreatedEvent> {
    channelName: ChannelName.ProductCreated=ChannelName.ProductCreated;
    queueGroupName = 'rentit-service';


    // Here basically we are replicating the product data into the 
    // rentit database so that whenever the rentit service wants to 
    // get data about the product it dont have to go to the product
    // service to get that info.
    // So whenever a product created event takes place we create
    // a corresponding product entry in the rentit database

    // whenever we replicate data across microservices we should make 
    // sure we are using identical or consistent id between them 
    // to make sure we can identify this unique records between services
    async runOnReceivingMessage(inputData: ProductCreatedEvent['inputData'], msg: Message) {

        const { id, productName, productPrize } = inputData;
        const product = Product.build({
            id, productName, productPrize
        });
        await product.save();

        msg.ack();
    }


}