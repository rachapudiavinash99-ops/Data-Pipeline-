from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_datasets():
    return []

@router.post("/upload")
def upload_dataset():
    return {"message": "Dataset uploaded successfully"}
