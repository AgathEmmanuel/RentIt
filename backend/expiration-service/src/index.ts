
import { RentitCreatedSubscriber } from './events/subscribers/rentit-created-subscriber';
import { natsDriver } from './nats-driver';
// lowercase  natsDriver  to specify its an instance of the 
// class NatsDriver



const authStart = async () => {

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

    new RentitCreatedSubscriber(natsDriver.stanCient).subscriptionSetUp();
    


} catch (err) {
    console.error(err);
    }
}


authStart();