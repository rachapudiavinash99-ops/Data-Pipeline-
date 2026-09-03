import time

def execute_pipeline_task(pipeline_id: int):
    print(f"Executing pipeline {pipeline_id} in background")
    time.sleep(2)
    print(f"Pipeline {pipeline_id} execution completed")
