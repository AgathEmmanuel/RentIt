def implicit():
    from google.cloud import storage

    bucket_name = "my-bucket-test-tf"

    # If you don't specify credentials when constructing the client, the
    # client library will look for credentials in the environment.
    storage_client = storage.Client()


    # Make an authenticated API request
    blobs = list(storage_client.list_blobs(bucket_name))
    for blob in blobs:
        print(blob.name)

implicit()
