import pandas as pd
from typing import Dict, Any

class DataQualityEngine:
    @staticmethod
    def calculate_metrics(df: pd.DataFrame, initial_count: int, failed_count: int) -> Dict[str, Any]:
        \"\"\"
        Calculates data quality metrics for a processed dataset.
        \"\"\"
        if df.empty:
            return {"quality_score": 0.0, "total_records": initial_count}
            
        total_columns = len(df.columns)
        null_count = df.isnull().sum().sum()
        total_cells = len(df) * total_columns
        
        completeness = 100.0 - ((null_count / total_cells) * 100.0) if total_cells > 0 else 100.0
        
        duplicate_count = df.duplicated().sum()
        uniqueness = 100.0 - ((duplicate_count / len(df)) * 100.0) if len(df) > 0 else 100.0
        
        validity = 100.0 - ((failed_count / initial_count) * 100.0) if initial_count > 0 else 100.0
        
        # Aggregate Score
        quality_score = (completeness + uniqueness + validity) / 3.0

        return {
            "total_records": initial_count,
            "successful_records": len(df),
            "failed_records": failed_count,
            "completeness": round(completeness, 2),
            "uniqueness": round(uniqueness, 2),
            "validity": round(validity, 2),
            "quality_score": round(quality_score, 2)
        }
