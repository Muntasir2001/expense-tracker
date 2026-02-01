# crud.py
from datetime import datetime
from typing import Optional

from sqlalchemy import select
from .database import SessionLocal
from .schema import Expense

# CREATE
def create_expense(
    title: str,
    amount: float,
    expense_date_time: datetime,
    description: Optional[str] = None,
    note: Optional[str] = None
) -> Expense:
    """Create a new expense record"""
    with SessionLocal() as db:
        new_expense = Expense(
            title=title,
            amount=amount,
            expense_date_time=expense_date_time,
            description=description,
            note=note
        )
        db.add(new_expense)
        db.commit()
        db.refresh(new_expense)
        return new_expense

# READ ALL
def get_all_expenses() -> list[Expense]:
    """Retrieve all expense records"""
    with SessionLocal() as db:
        stmt = select(Expense)
        return list(db.scalars(stmt).all())

# READ ONE
def get_expense_by_id(expense_id: str) -> Optional[Expense]:
    """Retrieve a single expense by ID"""
    with SessionLocal() as db:
        stmt = select(Expense).where(Expense.id == expense_id)
        return db.scalar(stmt)

# UPDATE
def update_expense(
    expense_id: str,
    title: Optional[str] = None,
    amount: Optional[float] = None,
    expense_date_time: Optional[datetime] = None,
    description: Optional[str] = None,
    note: Optional[str] = None
) -> Optional[Expense]:
    """Update an existing expense record"""
    with SessionLocal() as db:
        stmt = select(Expense).where(Expense.id == expense_id)
        expense = db.scalar(stmt)
        
        if not expense:
            return None
        
        if title is not None:
            expense.title = title
        if amount is not None:
            expense.amount = amount
        if expense_date_time is not None:
            expense.expense_date_time = expense_date_time
        if description is not None:
            expense.description = description
        if note is not None:
            expense.note = note
        
        db.commit()
        db.refresh(expense)
        return expense

# DELETE
def delete_expense(expense_id: str) -> bool:
    """Delete an expense record"""
    with SessionLocal() as db:
        stmt = select(Expense).where(Expense.id == expense_id)
        expense = db.scalar(stmt)
        
        if not expense:
            return False
        
        db.delete(expense)
        db.commit()
        return True