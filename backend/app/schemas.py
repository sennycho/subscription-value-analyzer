from typing import Optional
from pydantic import BaseModel, Field
from .models import BillingCycle, Category


class SubscriptionCreate(BaseModel):
    name: str
    category: Category = Category.OTHER
    price: int = Field(ge=0)
    billing_cycle: BillingCycle = BillingCycle.MONTHLY
    billing_day: Optional[int] = Field(default=None, ge=1, le=31)

    is_shared: bool = False
    shared_members: Optional[int] = Field(default=None, ge=1)

    usage_per_week: Optional[int] = Field(default=None, ge=0)
    satisfaction: Optional[int] = Field(default=None, ge=1, le=5)


class SubscriptionUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[Category] = None
    price: Optional[int] = Field(default=None, ge=0)
    billing_cycle: Optional[BillingCycle] = None
    billing_day: Optional[int] = Field(default=None, ge=1, le=31)

    is_shared: Optional[bool] = None
    shared_members: Optional[int] = Field(default=None, ge=1)

    usage_per_week: Optional[int] = Field(default=None, ge=0)
    satisfaction: Optional[int] = Field(default=None, ge=1, le=5)


class SubscriptionOut(BaseModel):
    id: int
    name: str
    category: Category
    price: int
    billing_cycle: BillingCycle
    billing_day: Optional[int]
    is_shared: bool
    shared_members: Optional[int]
    usage_per_week: Optional[int]
    satisfaction: Optional[int]

    monthly_equivalent: float
    value_score: Optional[float]
    waste_score: Optional[float]


class DashboardOut(BaseModel):
    monthly_total: float
    yearly_total: float
    potential_savings_monthly: float
    top_candidates: list[SubscriptionOut]
