# Operations  

## CI CD  Set up with Github  

-----  local machine  

assume dev as the main branch  
any other microservice will be a separate branch  
dev branch will have all microservices  
each microservice in dev branch will have tests  
which need to be run before any merge  


- make changes to a specific service  
- commit code to a sub branch  
- creat a PR for the change  
- githubActions or Jenkins runs all tests in the master branch of project  
- githubActions or Jenkins build and deploy when master branch changes  


Mono Repo Approach  
Repo per Service Approach  



##Deployment  

build new image  
push to docker hub  
update deployment  



## kubernetes  

kubectl config view  
kubectl config use-context <context_name>  



## Set up with GCP and Skaffold  


gcloud config set project <project-name>  
gcloud config set compute/zone us-central1-a  


OR  

gcloud init  


gcloud container clusters get-credentials <cluster-name>  


- Enable Google Cloud Build  
- Adding Google cloud build to skaffold  
- Setup ingress-nginx on GKE  
- Or if using Istio install istio on GKE  
- Updating k8s yaml file to point remote cluster  



















# Links 
[https://kubernetes.github.io/ingress-nginx/](https://kubernetes.github.io/ingress-nginx/)  
[https://kubernetes.github.io/ingress-nginx/deploy/#quick-start](https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)  
[https://kubernetes.io/docs/concepts/services-networking/ingress/](https://kubernetes.io/docs/concepts/services-networking/ingress/)  

