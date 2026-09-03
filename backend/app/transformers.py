import pandas as pd
from typing import List, Dict, Any

class DataTransformer:
    def __init__(self, steps: List[Dict[str, Any]]):
        self.steps = steps

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        \"\"\"
        Transforms a dataframe based on sequential steps.
        \"\"\"
        result_df = df.copy()

        for step in self.steps:
            action = step.get("action")
            
            if action == "rename_columns":
                mapping = step.get("mapping", {})
                result_df.rename(columns=mapping, inplace=True)
                
            elif action == "remove_duplicates":
                subset = step.get("subset")
                result_df.drop_duplicates(subset=subset, inplace=True)
                
            elif action == "fill_missing":
                column = step.get("column")
                value = step.get("value")
                if column in result_df.columns:
                    result_df[column].fillna(value, inplace=True)
                    
            elif action == "calculate_column":
                new_col = step.get("new_column")
                expr = step.get("expression") # Example: safe limited eval or predefined ops
                # Stub for calculated columns
                pass

        return result_df
