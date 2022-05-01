import { ChannelName, Publisher } from "@rentit/shared-custom-package";

import { ProductUpdatedEvent } from "@rentit/shared-custom-package";


export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
    channelName: ChannelName.ProductUpdated =  ChannelName.ProductUpdated;

    // type annotation and values assignment need to be done
    // to make sure its not allowed to change this values
    // at any other point of time

}