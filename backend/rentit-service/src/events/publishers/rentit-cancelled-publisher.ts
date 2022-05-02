import { Publisher } from "@rentit/shared-custom-package";

import { RentitCancelledEvent } from "@rentit/shared-custom-package";

import { ChannelName } from "@rentit/shared-custom-package";


export class RentitCancelledPublisher extends Publisher<RentitCancelledEvent> {
    channelName: ChannelName.RentitCancelled = ChannelName.RentitCancelled;
}


