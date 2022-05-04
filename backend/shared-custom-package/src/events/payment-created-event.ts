import { ChannelName } from "./channel-name";


export interface PaymentCreatedEvent {
    channelName: ChannelName.PaymentCreated;
    inputData: {

        id: string;
        rentitId: string;
        stripeId: string;
    }
}