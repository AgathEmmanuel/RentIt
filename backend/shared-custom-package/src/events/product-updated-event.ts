import { ChannelName } from "./channel-name";

export interface ProductUpdatedEvent {
    channelName: ChannelName.ProductRentedout;
    inputData: {
        id: string;
        productName: string;
        productPrize: number;  
        userId: string;
    };
}