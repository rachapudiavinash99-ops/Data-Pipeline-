from fastapi import FastAPI
from app.routers import auth, users

app = FastAPI(
    title="Data Pipeline Management API",
    description="API for the End-to-End Data Pipeline Management Platform",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Data Pipeline Management API"}
