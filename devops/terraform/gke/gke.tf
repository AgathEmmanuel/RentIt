# GKE cluster
resource "google_container_cluster" "primary" {
  name     = "${var.project_id}-gke"
  # location = var.region
  # if we provide region instead of zone it will be a regional cluster
  location = "us-central1-c"
  
  # creating separately managed node pools. 
  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}

# Separately Managed Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name       = "${google_container_cluster.primary.name}-node-pool"
  # location   = var.region
  # when location set to region it will create nodes in all zones
  location = "us-central1-c"
  cluster    = google_container_cluster.primary.name
  node_count = 1
  # node_count = var.gke_num_nodes

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    labels = {
      env = var.project_id
    }

    # preemptible  = true
    # machine_type = "n1-standard-1"
    # 3.75GB
    # machine_type = "e2-micro" 
    # 1GB
    # machine_type = "e2-medium"
    # 4GB
    # machine_type = "e2-standard-2"
    # 8GB
    machine_type = "e2-small"
    # 2GB
    tags         = ["gke-node", "${var.project_id}-gke"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}


# provider "kubernetes" {
#   load_config_file = "false"

#   host     = google_container_cluster.primary.endpoint
#   username = var.gke_username
#   password = var.gke_password

#   client_certificate     = google_container_cluster.primary.master_auth.0.client_certificate
#   client_key             = google_container_cluster.primary.master_auth.0.client_key
#   cluster_ca_certificate = google_container_cluster.primary.master_auth.0.cluster_ca_certificate
# }
