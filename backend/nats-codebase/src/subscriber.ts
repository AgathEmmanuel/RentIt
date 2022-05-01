import stan from 'node-nats-streaming';
import { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { ProductRentedOutSubscriber } from './events/product-rentedout-sbscriber';


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
    //'product:rentedout',
    'product:created',
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

