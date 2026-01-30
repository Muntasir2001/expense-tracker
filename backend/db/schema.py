from typing import Optional
from datetime import datetime

from sqlalchemy import String, Float, DateTime, Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session

class Base(DeclarativeBase):
    pass

class Expense(Base):
    __tablename__ = 'expenses'
    
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    expense_date_time: Mapped[datetime] = mapped_column(DateTime)
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    note: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    price: Mapped[float] = mapped_column(Float)
    
    def __repr__(self) -> str:
        return f"Expense(id={self.id!r}, title={self.title!r}, price={self.price!r})"