import { ChannelName } from "./channel-name";

export interface RentitCancelledEvent {
  channelName: ChannelName.RentitCancelled;
  inputData: {
    id: string;
    product: {
        id: string;
    }
  };
}
