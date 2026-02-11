import math

WEEKS_PER_MONTH = 4.345  # 평균 월 주수

def monthly_equivalent(price: int, billing_cycle: str) -> float:
    if billing_cycle == "MONTHLY":
        return float(price)
    if billing_cycle == "YEARLY":
        return float(price) / 12.0
    if billing_cycle == "WEEKLY":
        return float(price) * WEEKS_PER_MONTH
    return float(price)

def apply_sharing(cost: float, is_shared: bool, shared_members: int | None) -> float:
    if not is_shared:
        return cost
    members = shared_members or 1
    return cost / max(members, 1)

def value_score(usage_per_week: int | None, satisfaction: int | None) -> float | None:
    if usage_per_week is None or satisfaction is None:
        return None
    u_norm = min(usage_per_week / 10.0, 1.0)     # 주 10회 이상 충분
    s_norm = (satisfaction - 1) / 4.0            # 1->0, 5->1
    val = 100.0 * (0.6 * u_norm + 0.4 * s_norm)
    return round(val, 2)

def waste_score(monthly_cost: float, val_score: float | None) -> float | None:
    if val_score is None:
        return None
    w = (1.0 - val_score / 100.0) * math.log1p(max(monthly_cost, 0.0))
    return round(w, 4)
