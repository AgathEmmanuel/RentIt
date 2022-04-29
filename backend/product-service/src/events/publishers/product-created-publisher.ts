import { ChannelName, Publisher } from "@rentit/shared-custom-package";

import { ProductCreatedEvent } from "@rentit/shared-custom-package";


export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
    channelName: ChannelName.ProductCreated = ChannelName.ProductCreated;
    // type annotation and values assignment need to be done
    // to make sure its not allowed to change this values
    // at any other point of time

}