

gcloud config set project <project name>


terraform init  

terraform apply  


gcloud container clusters get-credentials $(terraform output -raw kubernetes_cluster_name) --region $(terraform output -raw region)  

gcloud container clusters get-credentials $(terraform output -raw kubernetes_cluster_name) --zone us-central1-c 

gcloud container clusters get-credentials test-cluster-ag --zone us-central1-c 

```

gcloud container clusters resize CLUSTER_NAME \
    --node-pool POOL_NAME \
    --num-nodes NUM_NODES

gcloud container node-pools list --cluster CLUSTER_NAME

gcloud container node-pools list --region us-central1


gcloud container node-pools describe POOL_NAME \
    --cluster CLUSTER_NAME

gcloud container clusters resize gke-name --node-pool gke-node-pool-name --num-nodes 1 --region us-central1



## adding service accounts to github actions  

cat {PATH_TO_DOWNLOADED_JSON_FILE} | base64  


```

[https://registry.terraform.io/providers/hashicorp/google/3.14.0/docs/resources/container_cluster](https://registry.terraform.io/providers/hashicorp/google/3.14.0/docs/resources/container_cluster)  

location - (Optional) The location (region or zone) in which the cluster master will be created, as well as the default node location. If you specify a zone (such as us-central1-a), the cluster will be a zonal cluster with a single cluster master. If you specify a region (such as us-west1), the cluster will be a regional cluster with multiple masters spread across zones in the region, and with default node locations in those zones as well


