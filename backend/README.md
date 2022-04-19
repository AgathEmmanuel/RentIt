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

