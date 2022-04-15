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

