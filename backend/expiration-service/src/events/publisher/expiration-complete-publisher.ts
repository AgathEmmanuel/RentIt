import { ChannelName, Publisher } from "@rentit/shared-custom-package";


import { ExpirationCompleteEvent } from "@rentit/shared-custom-package";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    channelName: ChannelName.ExpirationComplete = ChannelName.ExpirationComplete;

}

