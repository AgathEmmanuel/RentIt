import { Publisher } from "./publisher-template";
import { ProductRentedoutEvent } from "./product-rentedout-event";
import { ChannelName } from "./channel-name";



export class ProductRentedoutPublisher extends Publisher<ProductRentedoutEvent> {
    channelName: ChannelName.ProductRentedout = ChannelName.ProductRentedout;

}