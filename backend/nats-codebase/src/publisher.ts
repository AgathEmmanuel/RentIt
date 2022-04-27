import stan from 'node-nats-streaming';

console.clear();


const stanClient = stan.connect('clusterIdRentit', 'clientIdPublisher1', {
  url: 'http://localhost:4222',
});

stanClient.on('connect', () => {
  console.log('Publisher got connected to NATS');


  const eventDataJson = JSON.stringify({
      id: '1111',
      productName: 'car',
      productPrize: 222,
  });

  stanClient.publish('product:created', eventDataJson, () => {
      console.log('product:created event published');
  });

});