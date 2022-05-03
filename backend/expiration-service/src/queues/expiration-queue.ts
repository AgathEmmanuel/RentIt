import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publisher/expiration-complete-publisher';
import { natsDriver } from '../nats-driver';



interface JobData {
    rentitId: string;

}

const expirationQueue = new Queue<JobData>('rentit:expiration',{
    redis: {
        host: process.env.REDIS_HOST
    }
});



expirationQueue.process(async (job) => {
    console.log('publish expiration:complete for rentitId',job.data.rentitId
    );
    new ExpirationCompletePublisher(natsDriver.stanCient).publisherPublish({
        rentitId: job.data.rentitId,
    });


});


export { expirationQueue };
