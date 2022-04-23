import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';



let mongoTemp: any;
// hook that is going to run before all of our tests to 
// setup and connect to a temporory mongo memory server  
process.env.JWT_SECRET_KEY = 'aaaaabbbbbccccc';
beforeAll(async () => {
    mongoTemp = await MongoMemoryServer.create();
    const mongoUri = mongoTemp.getUri();
    await mongoose.connect(mongoUri)
});


// a hook that is going to run before each of the tests 
// connect to mongodb and reset all data in there  
// that is clear all collections that exist in the db
beforeEach(async () => {
    const collectionsInMongoTemp = await mongoose.connection.db.collections();
    for (let collection of collectionsInMongoTemp) {
        await collection.deleteMany({});
    }
});

// a hook that runs after all the tests are complete  
// to stop and close the tmporary mongo memory server
afterAll(async () => {
    await mongoTemp.stop();
    await mongoose.connection.close();
});