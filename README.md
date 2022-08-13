# RentIt


A Renting platform


# Architecture Diagram  

<img src="https://raw.githubusercontent.com/AgathEmmanuel/RentIt/dev/design/image/Rentit-Architecture.png" width="100%" >  

# Description  

A Project focused on learning and experimenting with techstacks and technologies  
to get perspectives on how **StartUps can function with an Enterprise Mindset**   

"Enterprise architecture (EA) is the practice of analyzing, designing, planning and implementing enterprise analysis to successfully execute on business strategies."   



# Features  

- [X] Microservice design pattern docs  
- [X] Choreography based event driven architecture  
- [X] product service: Post products for rent  
- [ ] media service: add images of products  
- [ ] comment service: Give comments on Products  
- [X] payment service: pay rent for the product  
- [ ] currency conversion  
- [X] rentit service: rent posted products  
- [X] frontend: basic-skeleton
- [X] authentication service: handle auth of the users  
- [ ] Istio based end user jwt authentication  
- [ ] OPA based end user jwt authorization    
- [ ] partner service: partners who do mass rent outs  
- [X] Terraform for the GKE cluster  
- [X] sample testing pipeline with Jest, node and Github actions on pull request  
- [X] local development with Minikube, Skaffold and Nginx Ingress
- [X] CI/CD with full app deploy with Github actions, Skaffold and GKE   
- [X] Containerization with Google Cloud Build and Container Registry  
- [ ] Helm chart for the project for Day 1 operations  
- [ ] Operators for the project for Day 2 operations  
- [ ] Data platform for Rental, Wholesale and Retail data analytics  
- [ ] ML platform for Rental Dynamic pricing, Predictive pricing, Predictive Serarch, Customer Profiling, Stocking and Recomendations  



# Enterprise Architecture for Startups  

1. Vision and Planning  
2. Business Architecture   
3. Data Architecture   
4. Information system and Technology Architecture  
5. Governance  
6. Migration plannings  
7. Change Management  
8. Multicloud portability  



- well architected startup can be a lot easier to scale and pivot  
- Business => Data => Application => Technology  
- having a revolving door policy for developers  
- multi-Speed architecture  
- microServices architecture   
- technical debt logging 
- designing business infrastructure and organizational structure based on vision, strategic intent, and function  
- provide the framework, tools, and perspectives to take a startup or business from its current state to its target state  

# Distributed System fundamentals  
- Data Durability and Consistency  
- Replication  
- Partitioning  
- Consensus  
- Storage and Retrieval  
- Data Models and Query Languages  
- Encoding and Evolution  
- Distributed Transactions  
- Reliable, Scalable, Mantainable  
- Batch Processing  
- Stream Processing  

# Business Properties  

- User can just rent out products or list there products for rent  
- Other users can rent the products  
- Any user can rent out and rent it  
- When user attempts to rent a product the product get locked for 10 minutes  
- In unlocked condition rent values can be edited  
- Based on time for which its scheduled for rent others can further rent same product  
- Based on available quantity for rent others can further rent same product  


# Web Page Overiew  
- Home page  
- Sign Up  
- Sign In  
- Rent Out  
- Rent It  
- My Rent Outs  
- My Rent Its  
- Payments (Rents)   



# Resources-Schema   

User { email : string, password : string }  
RentOrder { userId : RefToUser, status: Created|Cancelled|AwaitingPayment|Completed, ProducId : RefToTicket, expiresAt : Date }  
Product { title : string, price : number, userId : RefToUser, orderId : RefToRentOrder }  
RentPay { orderId : RefToOrder , status : Created|Failed|Completed , amount : number , stripeId : string , stripeRefundId : string }  

# Micro-Services  

- product-service  
- renting-service  
- expiration-service  
- payment-service  
- auth-service  


## auth-service  

- sign up a user  
- sign in a user  
- sign out a user  
- give current user info


## product-service  

- create a product  
- give info on a single product  
- edit a product  
- give info in all products  

## renting-service  

- enable users to rent any product


## expiration-service  

- the product initial rent should be payed within expiration time  


## payment-service  

- enable users to pay there rent  



# Associated-Events  
- UserCreated  
- UserUpdated  
- ProductCreated  
- ProductUpdated  
- RentOrderCreated  
- RentOrderCancelled  
- RentOrderExpired
- RentPayCreated  

# Technologies under Consideration  

- React, Next   
- Node, Python, Golang  
- MongoDB  
- Redis  
- NATS Streaming, PubSub, ActiveMQ, Kafka    
- Terraform  
- GCP  
- GKE
- Microservices, Rest, gRPC  
- Cloud Build  
- Container Registry  
- PyTorch  
- Kapitan  
- ArgoCD, Atlantis  
- Kubeflow & Ray.io, DataProc (Spark)      
- CloudSQL, Bigquery, BigTable, Postgres  
- Prometheus, Grafana  

