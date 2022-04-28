import { Stan } from 'node-nats-streaming';
import { Message } from 'node-nats-streaming';
import { ChannelName } from './channel-name';



interface Event {
  channelName: ChannelName;  // event must have a property which have one of the possible values in enum channel name
  inputData: any;

}

export abstract class Subscriber<T extends Event> {
  abstract queueGroupName: string;
  abstract channelName: T['channelName']; 
  private stanSubClient: Stan;
  protected listenerAckWaitTime = 5*1000;          // protected so that the subclass can define if if needed
  abstract runOnReceivingMessage(inputData: T['inputData'], msg: Message): void;
  
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


