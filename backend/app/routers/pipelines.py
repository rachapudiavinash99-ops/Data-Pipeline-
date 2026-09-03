from fastapi import APIRouter

router = APIRouter()

pipelines_db = [
    {"id": 1, "name": "Sales Data Pipeline", "status": "READY"}
]

@router.get("/")
def list_pipelines():
    return pipelines_db

@router.post("/")
def create_pipeline():
    new_id = len(pipelines_db) + 1
    new_pipeline = {
        "id": new_id,
        "name": f"Automated Data Pipeline {new_id}",
        "status": "INITIALIZED"
    }
    pipelines_db.append(new_pipeline)
    return {"message": f"Pipeline {new_id} successfully created!"}

@router.post("/{pipeline_id}/run")
def run_pipeline(pipeline_id: int):
    for p in pipelines_db:
        if p["id"] == pipeline_id:
            p["status"] = "COMPLETED"
    return {"message": f"Pipeline {pipeline_id} execution completed!"}

@router.post("/{pipeline_id}/transfer")
def transfer_data(pipeline_id: int):
    for p in pipelines_db:
        if p["id"] == pipeline_id:
            p["status"] = "TRANSFERRED"
    return {"message": f"Data from Pipeline {pipeline_id} successfully transferred!"}
