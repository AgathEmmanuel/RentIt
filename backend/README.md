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



# for typescript env setup

npm install typescript ts-node-dev express @types/express   

npm install typescript -g


tsc --init		# to create a ts config file  
ts-node-dev index.ts	# to run the application  


```
```


# Links

[https://expressjs.com/en/guide/error-handling.html](https://expressjs.com/en/guide/error-handling.html)  
[https://blog.logrocket.com/common-api-mistakes-and-how-to-avoid-them-804fbcb9cc4b/](https://blog.logrocket.com/common-api-mistakes-and-how-to-avoid-them-804fbcb9cc4b/)  
[https://blog.runscope.com/posts/3-reasons-your-api-might-fail](https://blog.runscope.com/posts/3-reasons-your-api-might-fail)  
[https://httptoolkit.tech/blog/http-api-problem-details/](https://httptoolkit.tech/blog/http-api-problem-details/)  
[https://en.wikipedia.org/wiki/List_of_HTTP_status_codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)  

