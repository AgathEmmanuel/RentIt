import { ChannelName } from "./channel-name";

export interface ProductUpdatedEvent {
    channelName: ChannelName.ProductUpdated;
    inputData: {
        id: string;
        version: number;
        productName: string;
        productPrize: number;  
        userId: string;
        rentitId?: string;
    };
}