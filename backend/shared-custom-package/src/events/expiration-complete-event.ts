import { ChannelName } from "./channel-name";



export interface ExpirationCompleteEvent {
    channelName: ChannelName.ExpirationComplete;
    inputData: {
        rentitId: string;
    }
}