import { Message } from 'node-nats-streaming';
import { Subscriber } from './subscriber-template'
import { ChannelName } from './channel-name';
import { ProductRentedoutEvent } from './product-rentedout-event';


export class ProductRentedOutSubscriber extends Subscriber<ProductRentedoutEvent> {
  readonly channelName: ChannelName.ProductRentedout = ChannelName.ProductRentedout;
  queueGroupName = 'payments-service';

  runOnReceivingMessage(inputData: ProductRentedoutEvent['inputData'], msg: Message) {
    console.log('Event data', inputData);

    console.log(inputData.productName);
    console.log(inputData.productPrize);
    msg.ack();
  }
}

