from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select

from ..db import get_session
from ..models import Subscription
from ..schemas import SubscriptionCreate, SubscriptionUpdate, SubscriptionOut
from ..services.scoring import monthly_equivalent, apply_sharing, value_score, waste_score

router = APIRouter()

def to_out(s: Subscription) -> SubscriptionOut:
    base = monthly_equivalent(s.price, s.billing_cycle.value)
    per = apply_sharing(base, s.is_shared, s.shared_members)
    v = value_score(s.usage_per_week, s.satisfaction)
    w = waste_score(per, v)

    return SubscriptionOut(
        id=s.id,
        name=s.name,
        category=s.category,
        price=s.price,
        billing_cycle=s.billing_cycle,
        billing_day=s.billing_day,
        is_shared=s.is_shared,
        shared_members=s.shared_members,
        usage_per_week=s.usage_per_week,
        satisfaction=s.satisfaction,
        monthly_equivalent=per,
        value_score=v,
        waste_score=w,
    )

@router.get("", response_model=list[SubscriptionOut])
def list_subscriptions(session: Session = Depends(get_session)):
    items = session.exec(select(Subscription).order_by(Subscription.id.desc())).all()
    return [to_out(i) for i in items]

@router.post("", response_model=SubscriptionOut)
def create_subscription(payload: SubscriptionCreate, session: Session = Depends(get_session)):
    if payload.is_shared and not payload.shared_members:
        raise HTTPException(status_code=400, detail="shared_members is required when is_shared is true")

    s = Subscription(**payload.model_dump())
    session.add(s)
    session.commit()
    session.refresh(s)
    return to_out(s)

@router.put("/{sub_id}", response_model=SubscriptionOut)
def update_subscription(sub_id: int, payload: SubscriptionUpdate, session: Session = Depends(get_session)):
    s = session.get(Subscription, sub_id)
    if not s:
        raise HTTPException(status_code=404, detail="Subscription not found")

    data = payload.model_dump(exclude_unset=True)

    # 공유로 변경하는데 인원수가 없으면 에러
    if data.get("is_shared") is True:
        shared_members = data.get("shared_members", s.shared_members)
        if not shared_members:
            raise HTTPException(status_code=400, detail="shared_members is required when is_shared is true")

    for k, v in data.items():
        setattr(s, k, v)

    s.updated_at = datetime.utcnow()
    session.add(s)
    session.commit()
    session.refresh(s)
    return to_out(s)

@router.delete("/{sub_id}")
def delete_subscription(sub_id: int, session: Session = Depends(get_session)):
    s = session.get(Subscription, sub_id)
    if not s:
        raise HTTPException(status_code=404, detail="Subscription not found")
    session.delete(s)
    session.commit()
    return {"deleted": True}
