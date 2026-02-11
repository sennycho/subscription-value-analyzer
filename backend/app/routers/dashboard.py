from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from ..db import get_session
from ..models import Subscription
from ..schemas import DashboardOut, SubscriptionOut
from .subscriptions import to_out

router = APIRouter()

@router.get("", response_model=DashboardOut)
def dashboard(session: Session = Depends(get_session)):
    items = session.exec(select(Subscription)).all()
    outs: list[SubscriptionOut] = [to_out(i) for i in items]

    monthly_total = sum(o.monthly_equivalent for o in outs)
    yearly_total = monthly_total * 12.0

    scored = [o for o in outs if o.waste_score is not None]
    scored.sort(key=lambda x: x.waste_score, reverse=True)
    top = scored[:3]

    potential_savings = sum(o.monthly_equivalent for o in top)

    return DashboardOut(
        monthly_total=round(monthly_total, 2),
        yearly_total=round(yearly_total, 2),
        potential_savings_monthly=round(potential_savings, 2),
        top_candidates=top,
    )
