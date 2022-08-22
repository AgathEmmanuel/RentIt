# RentIt


A Renting platform


# Architecture Diagram  

<img src="https://raw.githubusercontent.com/AgathEmmanuel/RentIt/dev/design/image/Rentit-Architecture.png" width="100%" >  

# Description  

A Project focused on learning and experimenting with techstacks and technologies  
to get perspectives on how **StartUps can function with an Enterprise Mindset**   

"Enterprise architecture (EA) is the practice of analyzing, designing, planning and implementing enterprise analysis to successfully execute on business strategies."   


# Key Considerations  

- Distributed resilient system design
- Continous Integration / Continous Deployment pipelines
- Data pipelines
- Continous Training pipelines
- Cybersecurity



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
- ArgoCD
- Kubeflow, DataProc (Spark)      
- Bigquery, CloudSQL, Postgres  
- Prometheus, Grafana  



# Links  

[https://omscs.gatech.edu/cs-7210-distributed-computing](https://omscs.gatech.edu/cs-7210-distributed-computing)  
[https://www.edx.org/course/modern-distributed-systems](https://www.edx.org/course/modern-distributed-systems)  
[https://www.distributedsystemscourse.com/](https://www.distributedsystemscourse.com/)  
[https://www.educative.io/blog/distributed-system-design-patterns](https://www.educative.io/blog/distributed-system-design-patterns)  
[Distributed Systems Course | Distributed Computing @ University Cambridge | Full Course: 6 Hours!](https://youtu.be/sGzQT_ZrsFI)  
[https://www.atlassian.com/microservices/microservices-architecture/distributed-architecture](https://www.atlassian.com/microservices/microservices-architecture/distributed-architecture)  
[https://medium.com/@kenlynterai/microservices-and-distributed-systems-36a90d5d8ce](https://medium.com/@kenlynterai/microservices-and-distributed-systems-36a90d5d8ce)  
[https://github.com/aphyr/distsys-class](https://github.com/aphyr/distsys-class)  
[https://link.springer.com/content/pdf/10.1007%2Fs00607-016-0508-7.pdf](https://link.springer.com/content/pdf/10.1007%2Fs00607-016-0508-7.pdf)  
[https://medium.com/baseds/many-nodes-one-distributed-system-9921f85205c4](https://medium.com/baseds/many-nodes-one-distributed-system-9921f85205c4)  
[https://microservices.io](https://microservices.io)  
[Kubernetes Native Applications](https://youtu.be/0Sdj9UBbM_s)  
[https://medium.com/platform-engineer/microservices-design-guide-eca0b799a7e8](https://medium.com/platform-engineer/microservices-design-guide-eca0b799a7e8)  
[MPI - Parallel and Distributed Computing Course: 7 Hours!](https://youtu.be/0GkPn7RFxcA)  
[https://www.snowflake.com/guides/data-pipeline](https://www.snowflake.com/guides/data-pipeline)  
[https://hazelcast.com/glossary/data-pipeline/](https://hazelcast.com/glossary/data-pipeline/)  
[https://www.sigmoid.com/blogs/apache-spark-on-dataproc-vs-google-bigquery/](https://www.sigmoid.com/blogs/apache-spark-on-dataproc-vs-google-bigquery/)  
[https://www.uber.com/blog//uber-big-data-platform](https://www.uber.com/blog//uber-big-data-platform)  
[https://eng.lyft.com/lyftlearn-ml-model-training-infrastructure-built-on-kubernetes-aef8218842bb](https://eng.lyft.com/lyftlearn-ml-model-training-infrastructure-built-on-kubernetes-aef8218842bb)  
[https://eng.lyft.com/ml-feature-serving-infrastructure-at-lyft-d30bf2d3c32a](https://eng.lyft.com/ml-feature-serving-infrastructure-at-lyft-d30bf2d3c32a)  
[https://fullstackdeeplearning.com/spring2021/lecture-6/](https://fullstackdeeplearning.com/spring2021/lecture-6/)  
[https://owasp.org/www-project-api-security/](https://owasp.org/www-project-api-security/)  
[https://semaphoreci.com/blog/release-management-microservices](https://semaphoreci.com/blog/release-management-microservices)  
[https://semaphoreci.com/community/tutorials/building-go-web-applications-and-microservices-using-gin](https://semaphoreci.com/community/tutorials/building-go-web-applications-and-microservices-using-gin)  
[https://semaphoreci.com/blog/cicd-pipeline](https://semaphoreci.com/blog/cicd-pipeline)  
[https://semaphoreci.com/cicd](https://semaphoreci.com/cicd)  
[https://semaphoreci.com/blog/domain-driven-design-microservices](https://semaphoreci.com/blog/domain-driven-design-microservices)  
[restful-microservices-using-node-js-and-express](https://www.coursera.org/specializations/restful-microservices-using-node-js-and-express)  
[https://semaphoreci.medium.com/testing-strategies-for-microservices-d7ba104ebfdd](https://semaphoreci.medium.com/testing-strategies-for-microservices-d7ba104ebfdd)  
[https://www.onixnet.com/insights/google-cloud-data-pipeline](https://www.onixnet.com/insights/google-cloud-data-pipeline)   

