import { ChannelName } from "./channel-name";



export interface ExpirationCompleteEvent {
    channelName: ChannelName.ExpirationComplete;
    data: {
        rentitId: string;
    }
}