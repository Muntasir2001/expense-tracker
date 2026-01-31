from typing import Union
from datetime import datetime
import uuid

from pydantic import BaseModel, Field

class Expense(BaseModel):
    id: uuid.UUID = Field(..., examples=["913ec680-3752-493a-b9d3-1329809f8c27"])
    title: str = Field(..., examples=["Title 1"])
    description: str = Field(..., examples=["Description 1"])
    note: str = Field(..., examples=["Note 1"])
    price: float = Field(..., examples=[100.50])
    expense_date_time: Union[str, datetime] = Field(..., examples=["2026-10-08T10:00:00"])
    created_at: Union[str, datetime] = Field(..., examples=["2026-10-10T10:00:00"])

class CreateExpense(BaseModel):
    title: str = Field(..., examples=["Title 1"])
    description: str = Field(..., examples=["Description 1"])
    note: str = Field(..., examples=["Note 1"])
    price: float = Field(..., examples=[100.50])
    expense_date_time: Union[str, datetime] = Field(..., examples=["2026-10-08T10:00:00"])