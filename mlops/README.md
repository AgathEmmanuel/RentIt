# ML platform  


- Rental recommendations using CloudSQL and spark  
- deploy ml model with spark connecting to data warehouse  
- build an sclable ML pipeline for the model  


- Data ingestion and featurization  (Spark, Kafka, etc..)  
- Training  (Tensorflow, Pytorch, etc)  
- Serving  

- How fast can we update the model  



## Business Requirements

- Recommendation of rentals based on preferences  

## Recommendation starategies  
- predict the rating the given user will give for a given rental product  
- make use of existing user ratings  
- similar minded users will have similar taste  
- actually how good is the product  
- how frequent should the predictive rating be calculated  
- stream processing can be used if rental recommendation have to updated in real time  
- batch processing can be used if rental recommendation have to updated only once per day  
- the predictive rating should be computed using a hadoop cluster  
- the predicted ratings will be stored in cloudSQL  
- sparkML can be used to run the ML job on DataProc  
- sparkML = feature prep + model training  
- save results of feature prep job in TF compatible format  
- create a TF job for training  
- create kubefow or argoflow pipeline to train the model  






# steps  
- Experimentation/Development  
- Training pipeline CI/CD  
- Continous Training  
- Model Serving CI/CD  
- Serving and Monitoring  



# ML Ops Overview    

MLOps is concerned with deploying the ML system and the continous evoulution of the models  

MLOps principles include   

-    Framing ML problems from business objectives  
-    Exploratory data analysis (EDA)  
-    Architect ML and data solutions for the problem  
-    Data Prep and Feature Engineering  
-    Model training and experimentation — data science  
-    Model training and tuning  
-    Building and automating ML pipelines  
-    Deploying models to the production system  
-    Model review and governance  
-    Model inference and serving  
-    Model monitoring, optimizing and maintainance  
-    Automated model retraining  
-    Explainability and interpretability  


Machine Learning frameworks such as Keras, PyTorch, Tensorflow  
Popular MLOps frameworks like Kubeflow, MLFlow, and DataRobot  
Continuous model monitoring and maintenance with focus on:  
Feedback loop  
Data Drift  
Seasonality  


This MLOps setup includes the following components:

-    Source control  
-    Test and build services  
-    Deployment services  
-    Model registry  
-    Feature store  
-    ML metadata store  
-    ML pipeline orchestrator.  



ML Ops Tools:  
- Kubeflow  
- MLflow  
- Metaflow  
- MLReef  
- Kedro  
- ZenML  
- MLRun  
- CML  
- Cortex Lab  
- Seldon Core  
- AutoKeras  
- H2O AutoML  
- Hadoop  
- Spark  
- Jupyter Notebook  
- Data Version Control (DVC)  
- Pachyderm  
- Flyte  



# Links  

[https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)  
[https://cloud.google.com/architecture/architecture-for-mlops-using-tfx-kubeflow-pipelines-and-cloud-build](https://cloud.google.com/architecture/architecture-for-mlops-using-tfx-kubeflow-pipelines-and-cloud-build)  
[https://neptune.ai/mlops-tool-stack](https://neptune.ai/mlops-tool-stack)  
[https://neptune.ai/blog/best-open-source-mlops-tools](https://neptune.ai/blog/best-open-source-mlops-tools)  
[https://www.kubeflow.org/docs/components/pipelines/introduction/](https://www.kubeflow.org/docs/components/pipelines/introduction/)  
[https://neptune.ai/blog/ways-ml-teams-use-ci-cd-in-production](https://neptune.ai/blog/ways-ml-teams-use-ci-cd-in-production)  
[How does Ray compare to Apache Spark??](https://youtu.be/yLKHHiT2nWw)  
[Introduction to Distributed Computing with the Ray Framework](https://youtu.be/cEF3ok1mSo0)  
[Autoscaling machine learning APIs in Python with Ray](https://youtu.be/Xa_94PuUYQI)  
[https://tryolabs.com/guides/retail-innovations-machine-learning](https://tryolabs.com/guides/retail-innovations-machine-learning)  
[https://medium.com/@karl.utermohlen/4-applications-of-machine-learning-ml-in-retail-f637c2fe196a](https://medium.com/@karl.utermohlen/4-applications-of-machine-learning-ml-in-retail-f637c2fe196a)  
[https://analyticsindiamag.com/how-can-ai-iot-data-help-streamline-vehicle-rental-services/](https://analyticsindiamag.com/how-can-ai-iot-data-help-streamline-vehicle-rental-services/)  
[https://towardsdatascience.com/ai-and-real-state-renting-in-amsterdam-part-1-5fce18238dbc](https://towardsdatascience.com/ai-and-real-state-renting-in-amsterdam-part-1-5fce18238dbc)  
[https://venturebeat.com/2021/11/04/using-ai-to-verify-renter-eligibility-and-risk/](https://venturebeat.com/2021/11/04/using-ai-to-verify-renter-eligibility-and-risk/)  


[https://cloud.google.com/dataproc/docs/guides/dpgke/quickstarts/dataproc-gke-quickstart-create-cluster](https://cloud.google.com/dataproc/docs/guides/dpgke/quickstarts/dataproc-gke-quickstart-create-cluster)  

[https://www.slideshare.net/databricks/migrating-apache-spark-ml-jobs-to-spark-tensorflow-on-kubeflow](https://www.slideshare.net/databricks/migrating-apache-spark-ml-jobs-to-spark-tensorflow-on-kubeflow)
[https://learnopencv.com/pytorch-to-tensorflow-model-conversion/](https://learnopencv.com/pytorch-to-tensorflow-model-conversion/)  
[https://neptune.ai/blog/moving-from-tensorflow-to-pytorch](https://neptune.ai/blog/moving-from-tensorflow-to-pytorch)  



