import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserHandler, errorHandler } from "@rentit/shared-custom-package";
import { routeNotFoundError } from "@rentit/shared-custom-package";
import { createPaymentRouter } from "./routes/createPayment";




const app = express();
app.set("trust proxy", 1);
// when traffic is being proxied to our application through
// ingress nginx, express will notice the pressence of proxy
// and will not trust the https connection
// so we manually ask express to trust the proxy

app.use(json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }));
// to disable https
app.use(cookieSession({ signed: false, secure: false }));
// to enable https
//app.use(cookieSession({ signed: false, secure: true }));
// disabling the cookie encryption which is present by default
// and this will enable the different microservices to consume
// the cookie easily and since jwt is encrypted anyways, so there
// is no security issue as well

app.use(currentUserHandler);

app.use(createPaymentRouter);


app.all("*", async (req, res) => {
  throw new routeNotFoundError();
});
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


export { app }
