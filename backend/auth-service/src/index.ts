import mongoose from 'mongoose';
import { app } from './app'




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
