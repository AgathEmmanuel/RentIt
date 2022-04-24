import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';

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
    function signupToGetCookie(): string[];
}

let mongoTemp: any;
// hook that is going to run before all of our tests to 
// setup and connect to a temporory mongo memory server  
beforeAll(async () => {
    process.env.JWT_SECRET_KEY = 'aaaaabbbbbccccc';
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
global.signupToGetCookie = () => {
    // faking authentication with a prebuilt a session jwt
    // build a jwt payload  { id, email}
    const jwtData = {
        id: 'aaaaaaaa',
        email: 'aaa@aaa.com'
    };
    // create the jwt
    const newJWT = jwt.sign( jwtData, process.env.JWT_SECRET_KEY! );
    // build a session object  { jwt: jwt_token }
    const sessionWithToken = { jwt: newJWT };
    // convert the session into json 
    const sessionJsonWithToken = JSON.stringify(sessionWithToken);
    // encode the json into base64
    const sessionBase64Encoded = Buffer.from(sessionJsonWithToken).toString('base64');
    // return a sting thats the cookie with the encoded data  
    return [`session=${sessionBase64Encoded}`];
    
};