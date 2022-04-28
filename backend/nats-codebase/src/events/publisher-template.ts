import { Stan } from "node-nats-streaming";
import { ChannelName } from "./channel-name";


interface Event {
    channelName: ChannelName;
    inputData: any;
}


export abstract class Publisher<T extends Event> {
    abstract channelName: T['channelName'];
    private stanPubClient: Stan;

    constructor(stanPubclient: Stan) {
        this.stanPubClient = stanPubclient;
    }

    publisherPublish(inputData: T['inputData']) {
        this.stanPubClient.publish(this.channelName,JSON.stringify(inputData), () => {
            console.log('Event published');
        });
    }


}