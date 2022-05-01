import { ChannelName } from "./channel-name";

export interface ProductUpdatedEvent {
    channelName: ChannelName.ProductUpdated;
    inputData: {
        id: string;
        productName: string;
        productPrize: number;  
        userId: string;
    };
}