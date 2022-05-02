import { Stan } from "node-nats-streaming";
import { ChannelName } from "./channel-name";


interface Event {
    channelName: ChannelName;
    inputData: any;
}


export abstract class Publisher<T extends Event> {
    abstract channelName: T['channelName'];
    //private stanPubClient: Stan;
    protected stanPubClient: Stan;

    constructor(stanPubclient: Stan) {
        this.stanPubClient = stanPubclient;
    }

    publisherPublish(inputData: T['inputData']): Promise<void> {
        // creating a Promise  
        return new Promise((resolve, reject) => {

        this.stanPubClient.publish(this.channelName,JSON.stringify(inputData), (err) => {
            if (err) {
                return reject(err); 
            }
            console.log('Event got published');
            console.log('Event published in channel',this.channelName);
            resolve();
        });

       });
    }


}