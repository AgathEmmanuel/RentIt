# Backend  






### APIs  

- auth-service

/api/users/signup	POST	{ email : string, password : string }  
/api/users/signin	POST	{ email : string, password : string }  
/api/users/signout	POST	{}  
/api/users/currentuser	GET	-


### Features  

```
posts-service
- create posts
- list posts


comments-service
- create comments
- list comments

```



# Steps  

```
npm init -y 


npm install express cors axios nodemon


--------- for auth

# for typescript env setup

npm install typescript ts-node-dev express @types/express   

npm install typescript -g


tsc --init		# to create a ts config file  

ts-node-dev index.ts	# to run the application  



Async/await error handling support for express js

npm install express-async-errors



Adding mongoose to connect with mongodb

npm install mongoose

if typescript shows any error, to solve that install this:
npm install @types/mongoose




Adding jwt toking support  

npm install jsonwebtoken @types/jsonwebtoken  




Adding session support

npm install cookie-session @types/cookie-session 



Creating a secret for jwt  

kubectl create secret generic jwt-secret --from-literal=JWT_SECRET_KEY=secretprivatekey





-------- communication between namespaces  

http://NAME-OF-SERVICE.NAMESPACE.svc.cluster.local  





----------  How to watch and reload ts-node when TypeScript files change


nodemon --watch "src/**" --ext "ts,json" --ignore "src/**/*.spec.ts" --exec "ts-node src/index.ts"

Or create a nodemon.json file with the following content:

{
  "watch": ["src"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts"],
  "exec": "ts-node ./src/index.ts"      // or "npx ts-node src/index.ts"
}

and then run nodemon with no arguments.

By virtue of doing this, you'll be able to live-reload a ts-node process without having to worry about the underlying implementation.



---------  for testing  

npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server  

NOTE: this will be installed only as developement dependencies and need not be available in building the container  

and in Dockerfile you can edit the RUN command as

RUN npm install --only=prod		# to install only prod dependencies  

and add in scripts

"scripts": {
	"test": "jest --watchAll --no-cache"
},




------------- publishing custom package to npm  

npm init  

npm publish --access public



------------- typescript to javascript conversion  

the library will is converted to javascript from typescript
befor conversion  


npm install typescript del-cli --save-dev  

in package.json

"build": tsc

tsc -- init

in tsconfig.json  

uncomment  

"declaration": true,
"outDir": "./build"



------------ to push latest updates to npm pacage

npm version patch

or change the version no and push  

npm run build

npm publish


npm install express express-validator cookie-session jsonwebtoken @types/express @types/cookie-session @types/jsonwebtoken



npm update @rentit/shared-custom-package


npm view @rentit/shared-custom-package version --json  #to view available version
npm view @rentit/shared-custom-package versions --json  #to view available version

npm list 		# to list local packages with version
npm list -g


@saltire sorry for the confusion, we need to update the docs to clarify that npm update will install & update the package-lock.json but not modify the spec defined in package.json; As you noted, you can still update that by running npm install <pkg>@<version> - this was a breaking change from v6, as that previously would modify package.json


-------------- testing  

https://www.npmjs.com/package/supertest


npm run test  
Jest  

Start in-memory copy of mongodb  
start up express app  
use supertest library to make fake requests to express app  
run assertions to make sure the request did the right thing  


test dependencies should be installed only as development depnendencies  

npm install --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server  

RUN npm install --only-prod  


"test": "jest --watchAll --no-cache"


https://nodkz.github.io/mongodb-memory-server/docs/guides/migration/migrate7/#no-function-other-than-start-create-ensureinstance-will-be-starting-anything



---------- to install from a package.json  file

npm install   


------------ for media service

[https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices](https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices)  



------------  event bust   NATS streaming server  


docs.nats.io  

[https://www.npmjs.com/package/node-nats-streaming](https://www.npmjs.com/package/node-nats-streaming)  


npm install node-nats-streaming ts-node-dev typescript @types/node  


kubectl port-forward <pod-name> <port-num>:<port-num>  

kubectl port-forward nats-deploy-768bbf445b-266j6 4222:4222  



[https://docs.nats.io/legacy/stan/streaming/connecting](https://docs.nats.io/legacy/stan/streaming/connecting)  

  "publish": "ts-node-dev --rs --notify false src/publisher.ts",
  "listen": "ts-node-dev --rs --notify false src/listener.ts"



k port-forward nats-deploy-84868bdc97-6jh5k 8222:8222

http://localhost:8222/streaming/clientsz

http://localhost:8222/streaming/clientsz?subs=1



------------ event handling 

with typescript a common module is used for  the following

listing of event names  
exact definition of each event  


this works if all microservice are written in typescript  


if multple services are written in multiple languages  
for event handling we can use  

JSON Schema  
Protobuf 
Apache Avro  


-------- associating documents in mongodb  

- embedding 
- Ref/Population feature



-------- events published by each service   

product service
- product created
- product updated

rentit service
- rentit created
- rentit cancelled

payment service
- payment created

expiration service
- expiration complete

media service
- picture uploaded  

```


# Links

[https://expressjs.com/en/guide/error-handling.html](https://expressjs.com/en/guide/error-handling.html)  
[https://blog.logrocket.com/common-api-mistakes-and-how-to-avoid-them-804fbcb9cc4b/](https://blog.logrocket.com/common-api-mistakes-and-how-to-avoid-them-804fbcb9cc4b/)  
[https://blog.runscope.com/posts/3-reasons-your-api-might-fail](https://blog.runscope.com/posts/3-reasons-your-api-might-fail)  
[https://httptoolkit.tech/blog/http-api-problem-details/](https://httptoolkit.tech/blog/http-api-problem-details/)  
[https://en.wikipedia.org/wiki/List_of_HTTP_status_codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)  
[https://www.npmjs.com/package/express-async-errors](https://www.npmjs.com/package/express-async-errors)  
[https://www.base64decode.org/](https://www.base64decode.org/)  
[https://jwt.io/](https://jwt.io/)  
[https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client](https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client)  
[https://www.npmjs.com/package/cookie-session](https://www.npmjs.com/package/cookie-session)  
[http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/)  
[https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change)  
[https://stackoverflow.com/questions/64831173/skaffold-is-not-detecting-js-file-changes](https://stackoverflow.com/questions/64831173/skaffold-is-not-detecting-js-file-changes)  
[https://www.querythreads.com/how-to-watch-and-reload-ts-node-when-type-script-files-change/](https://www.querythreads.com/how-to-watch-and-reload-ts-node-when-type-script-files-change/)  
[https://docs.nats.io/](https://docs.nats.io/)  
[https://docs.nats.io/running-a-nats-service/nats-kubernetes/basic-nats-and-nats-streaming-setup](https://docs.nats.io/running-a-nats-service/nats-kubernetes/basic-nats-and-nats-streaming-setup)  
[https://stackoverflow.com/questions/47736473/how-to-define-global-function-in-typescript](https://stackoverflow.com/questions/47736473/how-to-define-global-function-in-typescript)  
[https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-d-ts.html)  
[https://javascript.plainenglish.io/how-to-create-global-variables-in-typescript-with-node-js-9ca24f648991](https://javascript.plainenglish.io/how-to-create-global-variables-in-typescript-with-node-js-9ca24f648991)  
[https://developerlife.com/2021/07/02/nodejs-typescript-handbook/](https://developerlife.com/2021/07/02/nodejs-typescript-handbook/)  
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)  
[https://nodejs.dev/learn/nodejs-with-typescript](https://nodejs.dev/learn/nodejs-with-typescript)  
[https://www.typescriptlang.org/docs/handbook/functions.html](https://www.typescriptlang.org/docs/handbook/functions.html)  
[https://marcinbiernat.pl/2020/03/nodejs-globals/](https://marcinbiernat.pl/2020/03/nodejs-globals/)  
```
declare global {
    function signupToGetCookie(): Promise<string[]>;
}

Note: For @types/node < 16 you need to go with:
declare global {
    namespace NodeJS {
        interface Global {
            signupToGetCookie: Promise<string[]>;
        }
    }
}

```
[https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)  
[https://www.toptal.com/nodejs/top-10-common-nodejs-developer-mistakes](https://www.toptal.com/nodejs/top-10-common-nodejs-developer-mistakes)  
[https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf](https://medium.com/gist-for-js/use-of-res-json-vs-res-send-vs-res-end-in-express-b50688c0cddf)  
[https://stackoverflow.com/questions/2802055/what-does-the-construct-x-x-y-mean](https://stackoverflow.com/questions/2802055/what-does-the-construct-x-x-y-mean)  
[https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices](https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices)  
[https://www.typescripttutorial.net/typescript-tutorial/typescript-default-parameters/](https://www.typescripttutorial.net/typescript-tutorial/typescript-default-parameters/)  
[https://itnext.io/contrasting-nats-with-apache-kafka-1d3bdb9aa767](https://itnext.io/contrasting-nats-with-apache-kafka-1d3bdb9aa767)  
[https://hub.docker.com/_/nats-streaming](https://hub.docker.com/_/nats-streaming)  
[https://docs.nats.io/legacy/stan/streaming/connecting](https://docs.nats.io/legacy/stan/streaming/connecting)  
