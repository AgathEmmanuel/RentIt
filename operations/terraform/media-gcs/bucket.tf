provider "google" {
project = var.project_id
region  = var.region
}




resource "google_storage_bucket_access_control" "public_rule" {
  bucket = google_storage_bucket.bucket.name
  role   = "READER"
  entity = "allUsers"
}


# Create a GCS Bucket
resource "google_storage_bucket" "bucket" {
name     = var.bucket_name
location = var.region
}
