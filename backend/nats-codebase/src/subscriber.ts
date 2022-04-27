import stan from 'node-nats-streaming';
import { Stan } from 'node-nats-streaming';
import { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';


console.clear();



//const stanClient = stan.connect('clusterIdRentit', 'clientIdSubscriber1', {
const stanClient = stan.connect('clusterIdRentit',randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});



stanClient.on('connect', () => {
  console.log('Listener got connected to NATS');

  stanClient.on('close',() => {
    console.log('Connection to NATS closed');
    process.exit();
  })

  const subscribeOptions = stanClient.subscriptionOptions()
    .setManualAckMode(true)     // sert the manual acknwoledgement mode to true, to prevent the default behaviour  
                            // of node nat streaming library where it goes to nat server and acknowledging recpetion of event
                            // instead we make it available for the message handler to acknowledg manually 
                            // to confirm the event is processed in a desirable manner and only after 
                            // that the event is lost

    .setDeliverAllAvailable()     // to get all events that have been emitted in the past
    .setDurableName('rentit-service') // to keep track of all events that have gone to the subsciption or the queue group;
                                      // even if the service goes offline for some time

  const subscription = stanClient.subscribe(
    'product:tedout',
    'rentit-service-queue-group',  // to not accidently dumb the durable name even if all the services restart for a small period of time
                                  // and to make sure all the emitted events go off to one instance of services even when there are 
                                  // multiple instances of the same service running
    subscribeOptions);

  subscription.on('message',(msg: Message) => {
      console.log('Message Received');
      const dataJson = msg.getData();
      if (typeof dataJson === 'string') {
          console.log(`event received | sequence | ${msg.getSequence()} | data  | ${dataJson}`);
      }

      msg.ack();


  });

  new ProductRentedOutSubscriber(stanClient).subscriptionSetUp();

});

process.on('SIGINT',() => stanClient.close());
process.on('SIGTERM',() => stanClient.close());


abstract class Subscriber {
  abstract queueGroupName: string;
  abstract channelName: string; 
  private stanSubClient: Stan;
  protected listenerAckWaitTime = 5*1000;          // protected so that the subclass can define if if needed
  abstract runOnReceivingMessage(inputData: any, msg: Message): void;
  
  constructor(stanSubClient: Stan) {
    this.stanSubClient = stanSubClient;
  }

  subscribeOptions() {
    return this.stanSubClient
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.listenerAckWaitTime)
      .setDurableName(this.queueGroupName)
  }

  processMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }

  subscriptionSetUp(){
    const subscription = this.stanSubClient.subscribe(
      this.channelName,
      this.queueGroupName,
      this.subscribeOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received | ${this.channelName} | ${this.queueGroupName}`
      );
      const processedMessage = this.processMessage(msg);
      this.runOnReceivingMessage(processedMessage, msg);
    });
  }

}


class ProductRentedOutSubscriber extends Subscriber {
  channelName = 'product:rentedout';
  queueGroupName = 'payments-service';

  runOnReceivingMessage(inputData: any, msg: Message) {
    console.log('Event data', inputData);
    msg.ack();
  }
}

