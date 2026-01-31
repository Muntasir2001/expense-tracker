from pydantic import BaseModel, Field


class ErrorMessage(BaseModel):
   status: int = Field(..., examples=[500], description="Status Code")
   title: str = Field(..., examples=["No Data returned for this action"], description="Title")