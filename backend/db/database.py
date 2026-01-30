# database.py
from typing import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from schema import Base

# Format: postgresql://username:password@host:port/database_name
DATABASE_URL = "postgresql://user:password@localhost:5432/expenses_db"

engine = create_engine(DATABASE_URL, echo=True)  # echo=True for SQL logging
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db() -> None:
    """Create all tables in the database"""
    Base.metadata.create_all(bind=engine)
    print("Database tables created successfully!")

def get_db() -> Generator[Session, None, None]:
    """Dependency to get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

if __name__ == "__main__":
    init_db()