from typing import Union, Optional
from datetime import datetime
import uuid

from pydantic import BaseModel, Field

class Expense(BaseModel):
    id: uuid.UUID = Field(..., examples=["913ec680-3752-493a-b9d3-1329809f8c27"])
    title: str = Field(..., examples=["Groceries"])
    description: str = Field(..., examples=["From Asda"])
    note: str = Field(..., examples=["Download the receipt later"])
    amount: float = Field(..., examples=[100.50])
    expense_date_time: Union[str, datetime] = Field(..., examples=["2026-10-08T10:00:00"])
    created_at: Union[str, datetime] = Field(..., examples=["2026-10-10T10:00:00"])

class CreateExpenseRequestModel(BaseModel):
    title: str = Field(..., examples=["Groceries"])
    description: str = Field(..., examples=["From Asda"])
    note: str = Field(..., examples=["Download the receipt later"])
    amount: float = Field(..., examples=[100.50])
    expense_date_time: Union[str, datetime] = Field(..., examples=["2026-10-08T10:00:00"])

class UpdateExpenseRequestModel(BaseModel):
    title: Optional[str] = Field(default=None, examples=["Groceries"])
    description: Optional[str] = Field(default=None, examples=["From Asda"])
    note: Optional[str] = Field(default=None, examples=["Download the receipt later"])
    amount: Optional[float] = Field(default=None, examples=[100.50])
    expense_date_time: Optional[Union[str, datetime] ]= Field(default=None, examples=["2026-10-08T10:00:00"])

class ExpenseResponseModel(BaseModel):
    result: str = Field(..., examples=["Expense created successfully"])
    expense_id: Optional[uuid.UUID] = Field(default=None, examples=["913ec680-3752-493a-b9d3-1329809f8c27"])
