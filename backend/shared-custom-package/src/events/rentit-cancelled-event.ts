import { ChannelName } from "./channel-name";

export interface RentitCancelledEvent {
  channelName: ChannelName.RentitCancelled;
  inputData: {
    id: string;
    version: number;
    product: {
        id: string;
    }
  };
}
