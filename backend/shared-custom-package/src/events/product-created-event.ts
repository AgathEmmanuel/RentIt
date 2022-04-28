import { ChannelName } from "./channel-name";

export interface ProductCreatedEvent {
    channelName: ChannelName.ProductCreated;
    inputData: {
        id: string;
        productName: string;
        productPrize: number;
        userId: string;
    };
}