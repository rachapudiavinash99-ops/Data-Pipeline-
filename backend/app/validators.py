import pandas as pd
from typing import List, Dict, Any, Tuple

class DataValidator:
    def __init__(self, rules: List[Dict[str, Any]]):
        self.rules = rules
        self.errors = []

    def validate(self, df: pd.DataFrame) -> Tuple[bool, pd.DataFrame, List[str]]:
        \"\"\"
        Validates a dataframe based on the provided rules.
        Returns: (is_valid, filtered_df, error_messages)
        \"\"\"
        error_messages = []
        valid_df = df.copy()

        for rule in self.rules:
            column = rule.get("column")
            rule_type = rule.get("type")

            if column not in valid_df.columns:
                error_messages.append(f"Missing required column: {column}")
                continue

            if rule_type == "required":
                missing = valid_df[column].isnull()
                if missing.any():
                    error_messages.append(f"{missing.sum()} rows missing required value in {column}")
                    valid_df = valid_df[~missing]

            elif rule_type == "numeric_range":
                min_val = rule.get("min", float('-inf'))
                max_val = rule.get("max", float('inf'))
                
                invalid = (valid_df[column] < min_val) | (valid_df[column] > max_val)
                if invalid.any():
                    error_messages.append(f"{invalid.sum()} rows out of range in {column}")
                    valid_df = valid_df[~invalid]
                    
        is_valid = len(error_messages) == 0
        return is_valid, valid_df, error_messages
