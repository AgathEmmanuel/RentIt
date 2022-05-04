import { ChannelName, Publisher } from "@rentit/shared-custom-package";

import { PaymentCreatedEvent } from "@rentit/shared-custom-package";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    channelName: ChannelName.PaymentCreated = ChannelName.PaymentCreated;
}