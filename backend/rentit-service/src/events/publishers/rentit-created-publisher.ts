import { Publisher } from "@rentit/shared-custom-package";

import { RentitCreatedEvent } from "@rentit/shared-custom-package";

import { ChannelName } from "@rentit/shared-custom-package";


export class RentitCreatedPublisher extends Publisher<RentitCreatedEvent> {
    channelName: ChannelName.RentitCreated = ChannelName.RentitCreated;
}


