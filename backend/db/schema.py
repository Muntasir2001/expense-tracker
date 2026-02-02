from typing import Optional
from datetime import datetime
import uuid

from sqlalchemy import String, Float, DateTime, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class Expense(Base):
    __tablename__ = 'expenses'
    
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    note: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    amount: Mapped[float] = mapped_column(Float)
    vat: Mapped[float] = mapped_column(Float)
    expense_date: Mapped[datetime] = mapped_column(DateTime,default=datetime.now)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    
    def __repr__(self) -> str:
        return f"Expense(id={self.id!r}, title={self.title!r}, amount={self.amount!r})"