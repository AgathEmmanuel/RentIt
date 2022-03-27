

# Microservices

- Monalithic application can be broken down into small microservices
- each functionality becomes a microservice
- typical structure can contain a main application and related microservices
- service registry = this will need to be added in between the services to find out(to query the service registry)  where to find the the respective services in the infrastructure and to provide needed load balancing(randomly or round robin) , here the services registers itself to registry and know where to find the service registry which is provided via network layer and DNS
- communcation layer in the main application = this will provide resiliance against the outages and can be achieved by circuit breaking and caching
- queue = (ex: RabbitMQ) can be used to publish to microservices instead of posting data directly
- microservices concept follow the priciple that services can be created and taken down at any time
- there can be a no of instances running a specific service and each listening on different IP endpoint
- service discovery = we need a mechanism to keep track of the services to provide info to route requests to the specific services 
- istio = its a service mesh which provides the functionality of service discovery
- containers can run in a software defined network
- istio and envoy are used in kubernetes for the service discovery for contanierised applications and here basically we are using infrastructure layer to do the routing for us if this is not possible to use we make use of service registry which is an application level component 



## Scaling

- microservices = single scalable instances that handle tiny processes
- cloning = forking nodejs processes into multiple instances
- concept of grouping instances under main processes and creating resilient clusters
- scaling data layer using techniques like horizontal partitioning
- horizontal partitioning = spliting data between databases 

> Monolithic Architecture
```

                                              __ feature A -->
 					     |			           | DB1 |
 					     |__ feature B -->
 					     |
Request -->  auth middleWare -->  router  -->|
 					     |__ feature C -->
 					     |			           | DB2 |
 					     |__ feature D -->

 					  Business Logic    Database Access
           |_______________________________________________________________|
			           Monolithic Server     


```

> Microservice Architecture
```
             auth middleWare -->  router  -->|feature A                     | DB A|
           |______________________________________________________________|
			           Microservice A

             auth middleWare -->  router  -->|feature B                     | DB B|
           |______________________________________________________________|
			           Microservice B
 Request ->
             auth middleWare -->  router  -->|feature C                     | DB C|
           |______________________________________________________________|
			           Microservice C

             auth middleWare -->  router  -->|feature D                     | DB D|
           |______________________________________________________________|
			           Microservice D

 					  Business Logic    Database Access
           |______________________________________________________________|
			           Microservices


```
- a microservice contains all code required to run one feature correctly

> Data management

Data management between different services is a big challenge
- how data is stored
- how data is accessed
- each service runs independently
- database schema can be changed unexpectedly
- each service will have its own database when needed
- no service will interfere with another services database
- each functionality or service might be efficient with a particular type of db
- some service requires an sql db while other need a nosql db.
- scaling a particular service will require scaling the entire db with other services as well if many services are mapped to a single database.
- if services interfere with other service dbs then failing of one service db will result in failure of the other service as well.

Communication between services
- sync    [ services communicate with each other using direct requests ]



  	       __  service A
  	      | 
   service Z  |__  service B
  	      |
  	      |__  service C


- async  [ services communicate with each other using events ]

Two ways to do async
   => using async to get instant output of request of a service from other requests via event bus
   => updating databases of all individual services using event bus when a service updates its db basically data duplication across service dbs

  service A <-> ||
  	        ||
  service B     ||
                || Event bus
  service C     ||
                ||
  service Z <-> ||
