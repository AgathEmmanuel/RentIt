import uvicorn
from fastapi import FastAPI, UploadFile

#  PostgreSQL database adapter for the Python https://pypi.org/project/psycopg2/
import psycopg2

from pydantic import BaseModel

from typing import List

"""
# Imports the Google Cloud client library
# https://cloud.google.com/storage/docs/reference/libraries
from google.cloud import storage

# Instantiates a client
storage_client = storage.Client()

# The name for the new bucket
bucket_name = "my-new-bucket"

# Creates the new bucket
bucket = storage_client.create_bucket(bucket_name)

print(f"Bucket {bucket.name} created.")
"""

class ImageModel(BaseModel):
    id: int
    image_name: str
    image_url: str
    is_present: bool

app = FastAPI(debug=True)

@app.get('/images', response_model=List[ImageModel])
async def get_all_images():
    connection = psycopg2.connect(database="dbname", user="user", password="password", host="0.0.0.0")
    curs = connection.cursor()
    curs.execute("SELECT * FROM images ORDER BY id DESC")
    objects = curs.fetchall()
    images_list = []
    for obj in objects:
        images_list.append(
            ImageModel( id=obj[0], image_name=obj[1], image_url=obj[2], is_present=obj[3])
        )
    curs.close()
    connection.close()
    return images_list


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)



