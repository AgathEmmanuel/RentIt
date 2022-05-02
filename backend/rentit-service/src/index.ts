import mongoose from 'mongoose';
import { app } from './app'
import { ProductCreatedSubscriber } from './events/subscriber/product-created-subscriber';
import { ProductUpdatedSubscriber } from './events/subscriber/product-updated-subscriber';

import { natsDriver } from './nats-driver';
// lowercase  natsDriver  to specify its an instance of the 
// class NatsDriver



const authStart = async () => {

    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY in not availble as env variable')
    }else {
        console.log("Secret Environmental variable available")
    }
    if (!process.env.MONGO_DB_URL) {
        throw new Error('MONGO_DB_URL in not availble as env variable')
    }else {
        console.log("Auth Mongodb url variable available")
    }

    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID in not availble as env variable')
    }else {
        console.log("Auth NATS_CLIENT_ID variable available")
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID in not availble as env variable')
    }else {
        console.log("Auth NATS_CLUSTER_ID variable available")
    }

    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL in not availble as env variable')
    }else {
        console.log("Auth NATS_URL variable available")
    }

    try {

//    await natsDriver.connect('clusterIdRentit','clientIdSubscriber1','http://nats-service:4222');
    await natsDriver.connect(process.env.NATS_CLUSTER_ID,process.env.NATS_CLIENT_ID,process.env.NATS_URL);

    natsDriver.stanCient.on('close',() => {
        console.log('Connection to NATS closed');
        process.exit();
        // this make sure to exit the process entirely any the connection
        // to nats is lost 

    });

    process.on('SIGINT',() => natsDriver.stanCient.close());
    process.on('SIGTERM',() => natsDriver.stanCient.close());
    // and anytime the INT or TERM signal comes in the client
    // will be closed down manually

    new ProductCreatedSubscriber(natsDriver.stanCient).subscriptionSetUp();
    new ProductUpdatedSubscriber(natsDriver.stanCient).subscriptionSetUp();

    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('Connected to MongoDb')
} catch (err) {
    console.error(err);
    }
    app.listen(3000, () => {
        console.log('I am up.....')
        console.log('Listeningggg on port 3000');
    });
}


authStart();