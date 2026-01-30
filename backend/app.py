import logging

from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from fastapi.exceptions import RequestValidationError

from custom_exception import CustomHttpException

app = FastAPI(
   title="Expense Tracker Docs",
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

@app.get("/")
def read_root():
   """Check whether the server is up"""

   return 'Hello World'
