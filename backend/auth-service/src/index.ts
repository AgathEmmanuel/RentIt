import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/currentuser';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

import { errorHandler } from './middleware/error-handler';
import { routeNotFoundError } from './error/route-not-found-error';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.all('*',async(req,res,next) => {
    next(new routeNotFoundError());
})
/*
app.get('*',() => {
    throw new routeNotFoundError();
})
app.all('*',() => {
    throw new routeNotFoundError();
})
// if you want to do the same for all type of operations
*/

app.use(errorHandler);


app.listen(3000, () => {
    console.log('Listeningggg on port 3000');
});