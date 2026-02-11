from app.services.scoring import monthly_equivalent, value_score, waste_score


def test_monthly_equivalent_yearly():
    assert monthly_equivalent(120000, "YEARLY") == 10000.0


def test_value_score_range():
    v = value_score(0, 1)
    assert v is not None
    assert 0 <= v <= 100


def test_waste_score_higher_when_value_low():
    low = waste_score(15000, 10)
    high = waste_score(15000, 90)
    assert low is not None and high is not None
    assert low > high
