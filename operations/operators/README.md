# Rentit platform k8s Operator  

rentit-operator  

### Operation functions  
- create rentit microservice deployments if not present 
- create service for each microservice if not present 
- create mongodb statefulsets if not present 
- create service for each mongodb if not present 
- make sure everything match their desired configurations  
- provision cloud bucket storage before deployments to use it with required apps  
- add functionality to bucket with restricted IAM acces via secrets  
- make a helm chart for the operator in a producton ready manner  
- circulate or synchronize security tokens when they change  
- scaling based on network requirement  
- auto upgrade with rolling behaviour   
- metrics and alerts by enabling metric target that can be used with prometheus  
- backup and restore  
- ensure that caches are written through before maintenance operations  
- monogdb : provisioning storage and computing power, configuring network connections, setting up users, and changing these settings as needed




Helm -> for day 1 operations  
Operator -> for day 2 operations  




### Best Practices  

- an operator should manage single type of applications  
- if significant orchestration and sequencing involved, an opeator that represents the entire stack should be written, in turn delegating to other operator for orchestrating their part of it  
- only one operator should control a CRD on a cluster  


### possible events  

- object created  
- object updated  
- object deleted  



### Steps  

```

Making an Operator for the creations cloud bucket storage required for the application  


kubebuilder init --domain operators.rentit.com --repo github.com/AgathEmmanuel/RentIt/operations/operators/cloudbucket  


kubebuilder create api --group cloudbucket --version v1alpha1 --kind BucketStorage  

make manifests  




```
