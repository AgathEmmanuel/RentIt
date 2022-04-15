# RentIt


A Renting platform


# Business Properties  

- User can just rent out products or list there products for rent  
- Other users can rent the products  
- Any user can rent out and rent it  
- When user attempts to rent a product the product get locked for 10 minutes  
- In unlocked condition rent values can be edited  
- Based on time for which its scheduled for rent others can further rent same product  
- Based on available quantity for rent others can further rent same product  

# Exta-Features  

- Post products for rent  
- Give comments on Products  
- Distributed transactions  
- Currency conversion  



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

# Associated-Events  
- UserCreated  
- UserUpdated  
- ProductCreated  
- ProductUpdated  
- RentOrderCreated  
- RentOrderCancelled  
- RentOrderExpired
- RentPayCreated  

# Technologies-Used  

- React  
- Node  
- MongoDB  
- Redis  
- NATS Server  

