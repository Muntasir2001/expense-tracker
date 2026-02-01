import logging
from typing import List, Optional
import asyncio

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware

from custom_exception import CustomHttpException
from db.crud import create_expense, get_all_expenses, update_expense, delete_expense
from db.database import init_db
from models.expense import Expense, CreateExpenseRequestModel, ExpenseResponseModel, UpdateExpenseRequestModel
from models.error import ErrorMessage

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup code
    await asyncio.sleep(3)
    init_db()
    yield
    # Shutdown code (if any)

app = FastAPI(
   title="Expense Tracker Docs",
   lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
	exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
	logging.error(f"{request}: {exc_str}")
	content = {'status_code': 10422, 'message': exc_str, 'data': None}
	return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

@app.exception_handler(CustomHttpException)
async def custom_exception_handler(request: Request, exc: CustomHttpException):
   return JSONResponse(
      status_code=exc.status_code,
      headers={"content-type": "application/problem+json"}, 
      content={
         "status": exc.status_code,
         "title": exc.title
   }
)

class JsonApiErrorResponse(JSONResponse):
    media_type = "application/problem+json"


@app.get("/")
def read_root():
   """Healthcheck"""

   return 'Hello World'


@app.get("/expenses",
    response_model=List[Optional[Expense]],
    responses={
        500: {
            "model": ErrorMessage,
            "content": {"application/problem+json": {
                "example": {
                    "status": 500,
                    "title": "There has been an error"
                }
            }}
        }
    }
)
def get_expenses_api():
    """Get all the expenses"""
    print(get_all_expenses())
    return get_all_expenses()


@app.post("/expense",
    response_model=ExpenseResponseModel,
    responses={
        500: {
            "model": ErrorMessage,
            "content": {"application/problem+json": {
                "example": {
                    "status": 500,
                    "title": "There has been an error"
                }
            }}
        }
    }
)
def create_expense_api(expense: CreateExpenseRequestModel):
    """Create expense"""

    create_expense_res = create_expense(
        title=expense.title,
        amount=expense.amount,
        expense_date_time=expense.expense_date_time,
        description=expense.description,
        note=expense.note
    )

    if not create_expense_res:
        return {
            "result": "Expense creation failed"
        }
    
    return {
        "result": "Expense created successfully!",
        "expense_id": create_expense_res.id
    }

@app.put("/expense/{id}",
    response_model=ExpenseResponseModel,
    responses={
        500: {
            "model": ErrorMessage,
            "content": {"application/problem+json": {
                "example": {
                    "status": 500,
                    "title": "There has been an error"
                }
            }}
        }
    }
)
def update_expense_api(id: str, req: UpdateExpenseRequestModel):
    """Update expense"""
    update_expense_res = update_expense(
        expense_id=id,
        title=req.title,
        amount=req.amount,
        expense_date_time=req.expense_date_time,
        description=req.description,
        note=req.note
    )

    if not update_expense_res:
        return {
            "result": "Expense not found!",
            "expense_id": id
        }

    return {
        "result": "Expense updated successfully!",
        "expense_id": id
    }

@app.delete("/expense/{id}",
    response_model=ExpenseResponseModel,
    responses={
        500: {
            "model": ErrorMessage,
            "content": {"application/problem+json": {
                "example": {
                    "status": 500,
                    "title": "There has been an error"
                }
            }}
        }
    }
)
def delete_expense_api(id: str):
    """Delete expense"""
    delete_expense_res = delete_expense(expense_id=id)

    if not delete_expense_res:
        return {
            "result": "Expense not found!",
            "expense_id": id
        }

    return {
        "result": "Expense deleted successfully!",
        "expense_id": id
    }