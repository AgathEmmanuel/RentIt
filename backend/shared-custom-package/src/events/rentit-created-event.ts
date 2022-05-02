import { ChannelName } from "./channel-name";
import { RentitStatus } from "./types/rentit-status";

export interface RentitCreatedEvent {
  channelName: ChannelName.RentitCreated;
  inputData: {
    id: string;
    status: RentitStatus;
    userId: string;
    expiresAt: string;
    product: {
        id: string;
        productPrize: number;
    }
  };
}
