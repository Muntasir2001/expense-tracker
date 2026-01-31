FROM python:3.9

WORKDIR /app
 
COPY requirements.txt .
 
RUN pip install -r requirements.txt
 
COPY . .

EXPOSE 8000

# PROD
# CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]

# DEV
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80", "--reload"]