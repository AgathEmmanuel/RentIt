import { Message } from 'node-nats-streaming';
import { Subscriber } from './subscriber-template'


export class ProductRentedOutSubscriber extends Subscriber {
  channelName = 'product:rentedout';
  queueGroupName = 'payments-service';

  runOnReceivingMessage(inputData: any, msg: Message) {
    console.log('Event data', inputData);
    msg.ack();
  }
}

