# crud.py
from datetime import datetime
from typing import Optional

from sqlalchemy import select, delete
from sqlalchemy.orm import Session

from schema import Expense

def create_expense(
    db: Session,
    title: str,
    price: float,
    expense_date_time: datetime,
    description: Optional[str] = None,
    note: Optional[str] = None
) -> Expense:
    """Create a new expense record"""
    new_expense = Expense(
        title=title,
        price=price,
        expense_date_time=expense_date_time,
        description=description,
        note=note
    )
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)
    return new_expense

def get_all_expenses(db: Session) -> list[Expense]:
    """Retrieve all expense records"""
    stmt = select(Expense)
    return list(db.scalars(stmt).all())

# TODO: might not be needed
def get_expense_by_id(db: Session, expense_id: int) -> Optional[Expense]:
    """Retrieve a single expense by ID"""
    stmt = select(Expense).where(Expense.id == expense_id)
    return db.scalar(stmt)

# TODO: might not be needed
def get_expenses_by_date_range(
    db: Session,
    start_date: datetime,
    end_date: datetime
) -> list[Expense]:
    """Retrieve expenses within a date range"""
    stmt = select(Expense).where(
        Expense.expense_date_time >= start_date,
        Expense.expense_date_time <= end_date
    )
    return list(db.scalars(stmt).all())

# TODO: might not be needed
def get_expenses_paginated(
    db: Session,
    skip: int = 0,
    limit: int = 10
) -> list[Expense]:
    """Retrieve expenses with pagination"""
    stmt = select(Expense).offset(skip).limit(limit)
    return list(db.scalars(stmt).all())

def update_expense(
    db: Session,
    expense_id: int,
    title: Optional[str] = None,
    price: Optional[float] = None,
    expense_date_time: Optional[datetime] = None,
    description: Optional[str] = None,
    note: Optional[str] = None
) -> Optional[Expense]:
    """Update an existing expense record"""
    stmt = select(Expense).where(Expense.id == expense_id)
    expense = db.scalar(stmt)
    
    if not expense:
        return None
    
    if title is not None:
        expense.title = title
    if price is not None:
        expense.price = price
    if expense_date_time is not None:
        expense.expense_date_time = expense_date_time
    if description is not None:
        expense.description = description
    if note is not None:
        expense.note = note
    
    db.commit()
    db.refresh(expense)
    return expense

def delete_expense(db: Session, expense_id: int) -> bool:
    """Delete an expense record"""
    stmt = select(Expense).where(Expense.id == expense_id)
    expense = db.scalar(stmt)
    
    if not expense:
        return False
    
    db.delete(expense)
    db.commit()
    return True

# TODO: might not be needed
def delete_expenses_by_date_range(
    db: Session,
    start_date: datetime,
    end_date: datetime
) -> int:
    """Delete multiple expenses within a date range"""
    stmt = delete(Expense).where(
        Expense.expense_date_time >= start_date,
        Expense.expense_date_time <= end_date
    )
    result = db.execute(stmt)
    db.commit()
    return result.rowcount