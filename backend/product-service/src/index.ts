import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';


import { errorHandler } from './middleware/error-handler';
import { routeNotFoundError } from './error/route-not-found-error';

const app = express();
app.set('trust proxy', 1);


app.use(json());
app.use(cookieSession({ signed: false, secure: true}));


app.all('*',async(req,res) => {
    throw new routeNotFoundError();
})

app.use(errorHandler);


const authStart = async () => {

    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY in not availble as env variable')
    }else {
        console.log("Secret Environmental variable available")
    }

    if (!process.env.MONGO_DB_URL) {
        throw new Error('MONGO_URL is not available as env')
    }else {
        console.log("product mongodb url available")
    }

    try {
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