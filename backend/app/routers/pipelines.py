from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_pipelines():
    return [{"id": 1, "name": "Sales Data Pipeline", "status": "READY"}]

@router.post("/")
def create_pipeline():
    return {"message": "Pipeline created"}

@router.post("/{pipeline_id}/run")
def run_pipeline(pipeline_id: int):
    return {"message": f"Pipeline {pipeline_id} queued for execution"}
