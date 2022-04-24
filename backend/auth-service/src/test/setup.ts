import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

/*
Note: For @types/node < 16 you need to go with:
declare global {
    namespace NodeJS {
        interface Global {
            signupToGetCookie: Promise<string[]>;
        }
    }
}
*/

declare global {
    function signupToGetCookie(): Promise<string[]>;
}

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



// adding helper function for auth to store in the cookies
// to be easily passed into the further corresponding requests  
global.signupToGetCookie = async () => {
    const email = 'zzz@zzz.com';
    const password = 'zzzzzz'
    const response = await request(app)
      .post('/api/user/signup')
      .send({
          email,password
      })
      .expect(201);
    const cookieData = response.get('Set-Cookie');
    return cookieData;
};