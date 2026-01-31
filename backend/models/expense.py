from typing import Union, Optional
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

class CreateExpenseRequestModel(BaseModel):
    title: str = Field(..., examples=["Title 1"])
    description: str = Field(..., examples=["Description 1"])
    note: str = Field(..., examples=["Note 1"])
    price: float = Field(..., examples=[100.50])
    expense_date_time: Union[str, datetime] = Field(..., examples=["2026-10-08T10:00:00"])

class UpdateExpenseRequestModel(BaseModel):
    title: Optional[str] = Field(default=None, examples=["Title 1"])
    description: Optional[str] = Field(default=None, examples=["Description 1"])
    note: Optional[str] = Field(default=None, examples=["Note 1"])
    price: Optional[float] = Field(default=None, examples=[100.50])
    expense_date_time: Optional[Union[str, datetime] ]= Field(default=None, examples=["2026-10-08T10:00:00"])

class ExpenseResponseModel(BaseModel):
    result: str = Field(..., examples=["Expense created successfully"])
    expense_id: Optional[uuid.UUID] = Field(default=None, examples=["913ec680-3752-493a-b9d3-1329809f8c27"])
