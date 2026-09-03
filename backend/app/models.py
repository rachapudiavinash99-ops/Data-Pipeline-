from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(String, default="Viewer")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    pipelines = relationship("Pipeline", back_populates="owner")

class Dataset(Base):
    __tablename__ = "datasets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    file_path = Column(String)
    file_type = Column(String)
    size_bytes = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Pipeline(Base):
    __tablename__ = "pipelines"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    status = Column(String, default="DRAFT") # DRAFT, READY, RUNNING, SUCCESS, FAILED
    configuration = Column(JSON, default={})
    owner_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    owner = relationship("User", back_populates="pipelines")
    executions = relationship("PipelineExecution", back_populates="pipeline")

class PipelineExecution(Base):
    __tablename__ = "pipeline_executions"
    id = Column(Integer, primary_key=True, index=True)
    pipeline_id = Column(Integer, ForeignKey("pipelines.id"))
    status = Column(String, default="QUEUED")
    logs = Column(Text, nullable=True)
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    pipeline = relationship("Pipeline", back_populates="executions")
