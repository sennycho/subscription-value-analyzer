from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Optional

from sqlmodel import SQLModel, Field


class BillingCycle(str, Enum):
    MONTHLY = "MONTHLY"
    YEARLY = "YEARLY"
    WEEKLY = "WEEKLY"


class Category(str, Enum):
    OTT = "OTT"
    MUSIC = "MUSIC"
    CLOUD = "CLOUD"
    PRODUCTIVITY = "PRODUCTIVITY"
    GAME = "GAME"
    NEWS = "NEWS"
    OTHER = "OTHER"


class Subscription(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    name: str
    category: Category = Category.OTHER

    price: int  # KRW
    billing_cycle: BillingCycle = BillingCycle.MONTHLY
    billing_day: Optional[int] = None  # 1~31 (월/연 결제일)

    is_shared: bool = False
    shared_members: Optional[int] = None  # is_shared일 때 >= 1

    usage_per_week: Optional[int] = None
    satisfaction: Optional[int] = None  # 1~5

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
