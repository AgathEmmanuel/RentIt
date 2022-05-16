

Using Google Cloud Service Accounts on GKE to access storage bucket from pods

```
gcloud iam service-accounts create ${SERVICE_ACCOUNT_NAME} --display-name="Media app Service Account"

gcloud iam service-accounts create media-sa --display-name="Media app Service Account"



gcloud iam service-accounts list  


gsutils iam ch serviceAccount:${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com:objectAdmin gs://${GCS_BUCKET_NAME}/



gcloud iam service-accounts keys create --iam-account "${SERVICE_ACCOUNT_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" service-account.json


kubectl create secret generic media-app-sa-key --from-file service-account.json


kubectl get secret



----------- in the deployment yaml
  template:
    metadata:
      name: my-app
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: IMAGE_URL
          env:
            - name: "GOOGLE_APP_CREDENTIALS"
              value: "/var/run/secret/cloud.google.com/service-account.json"
            - name: "BUCKET_NAME"
              value: my-app
          volumeMounts:
            - name: "service-account"
              mountPath: "/var/run/secret/cloud.google.com"
      volumes:
        - name: "service-account"
          secret:
            secretName: "my-app-sa-key"



5) Activate the service account

gcloud auth activate-service-account --project=someproject --key-file=gcpcmdlineuser.json

gcloud auth activate-service-account --key-file=gcpcmdlineuser.json










---------- access for gke to gcr  

create a service account with 


Container Registry Service Agent  
Kubernetes Engine Node Service Agent  


kubectl --namespace=dev create secret docker-registry gcr-json-key \
          --docker-server=https://gcr.io \
          --docker-username=_json_key \
          --docker-password="$(cat ~/Downloads/gcr-test.json)" \
          --docker-email=youremail@example.com

There are a few things to note about this command.

    We are naming the secret “gcr-json-key”. This is the name we will use when we configure ImagePullSecrets later.
    The docker username should be “_json_key”. It must be named this. Any other value will not work.
    The docker email address can be any valid email address.

At this point, we should be able to update the default service account for the namespace with ImagePullSecrets.

$ kubectl --namespace=dev patch serviceaccount default \
          -p '{"imagePullSecrets": [{"name": "gcr-json-key"}]}'
"default" patched

We use the kubectl patch command to configure the ImagePullSecrets on the default service account with the name of the secret we just created. 





```







# Links  

[https://cloud.google.com/storage/docs/listing-objects#storage-list-objects-python](https://cloud.google.com/storage/docs/listing-objects#storage-list-objects-python)  
[https://cloud.google.com/storage/docs/listing-objects#storage-list-objects-nodejs](https://cloud.google.com/storage/docs/listing-objects#storage-list-objects-nodejs)  

[https://cloud.google.com/docs/authentication/production#create-service-account-gcloud](https://cloud.google.com/docs/authentication/production#create-service-account-gcloud)  
[https://cloud.google.com/storage/docs/gsutil_install](https://cloud.google.com/storage/docs/gsutil_install)  
[https://cloud.google.com/storage/docs/gsutil/commands/iam](https://cloud.google.com/storage/docs/gsutil/commands/iam)  
[https://pnatraj.medium.com/how-to-run-gcloud-command-line-using-a-service-account-f39043d515b9](https://pnatraj.medium.com/how-to-run-gcloud-command-line-using-a-service-account-f39043d515b9)  
[https://ryaneschinger.com/blog/using-google-container-registry-gcr-with-minikube/](https://ryaneschinger.com/blog/using-google-container-registry-gcr-with-minikube/)  
[https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster)  
[https://blog.container-solutions.com/using-google-container-registry-with-kubernetes](https://blog.container-solutions.com/using-google-container-registry-with-kubernetes)  
