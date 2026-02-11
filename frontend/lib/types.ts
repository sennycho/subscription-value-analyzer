export type Subscription = {
  id: number;
  name: string;
  category: string;
  price: number;
  billing_cycle: string;
  billing_day: number | null;
  is_shared: boolean;
  shared_members: number | null;
  usage_per_week: number | null;
  satisfaction: number | null;
  monthly_equivalent: number;
  value_score: number | null;
  waste_score: number | null;
};

export type Dashboard = {
  monthly_total: number;
  yearly_total: number;
  potential_savings_monthly: number;
  top_candidates: Subscription[];
};
