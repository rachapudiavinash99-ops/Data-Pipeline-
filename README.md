# Data Pipeline Management Platform

An end-to-end Data Pipeline Management and Analytics Platform built with Python full-stack technologies.

## Installation
1. Clone the repository
2. Run 
pm install in the frontend directory.
3. Run pip install -r requirements.txt in the backend directory.

## Build
To build the frontend, run 
pm run build.
To build the docker images, run docker-compose build.

## Run
To run locally, execute:
- Backend: uvicorn main:app --reload
- Frontend: 
pm run dev
- Docker: docker-compose up -d

## Dependencies
- FastAPI
- React
- PostgreSQL

## Usage
Navigate to http://localhost:3000 to access the dashboard. Upload your CSV files, configure the transformation pipelines, and monitor execution.
