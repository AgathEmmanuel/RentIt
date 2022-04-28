import stan from 'node-nats-streaming';
import { ProductRentedoutPublisher } from './events/product-rentedout-publisher';


console.clear();


const stanClient = stan.connect('clusterIdRentit', 'clientIdPublisher1', {
  url: 'http://localhost:4222',
});

stanClient.on('connect', () => {
  console.log('Publisher got connected to NATS');


  const newProductRentedoutPublisher = new ProductRentedoutPublisher(stanClient) 
  newProductRentedoutPublisher.publisherPublish({
      id: '1111',
      productName: 'car',
      productPrize: 222,
  })

/*

  const eventDataJson = JSON.stringify({
      id: '1111',
      productName: 'car',
      productPrize: 222,
  });

  stanClient.publish('product:rentedout', eventDataJson, () => {
      console.log('product:created event published');
  });

*/



});