"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiPost } from "@/lib/api";

export default function NewForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("OTHER");
  const [price, setPrice] = useState<number>(0);
  const [billingCycle, setBillingCycle] = useState("MONTHLY");
  const [billingDay, setBillingDay] = useState<number>(1);
  const [usage, setUsage] = useState<number>(0);
  const [satisfaction, setSatisfaction] = useState<number>(3);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await apiPost("/api/subscriptions", {
        name,
        category,
        price,
        billing_cycle: billingCycle,
        billing_day: billingDay,
        is_shared: false,
        shared_members: null,
        usage_per_week: usage,
        satisfaction,
      });
      router.push("/subscriptions");
      router.refresh();
    } catch (err: any) {
      setError(String(err?.message ?? err));
    }
  }

  return (
    <form onSubmit={onSubmit} className="border rounded-2xl p-4 space-y-4">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="space-y-1">
        <label className="text-sm">서비스명</label>
        <input className="w-full border rounded-lg p-2" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm">카테고리</label>
          <select className="w-full border rounded-lg p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="OTT">OTT</option>
            <option value="MUSIC">MUSIC</option>
            <option value="CLOUD">CLOUD</option>
            <option value="PRODUCTIVITY">PRODUCTIVITY</option>
            <option value="GAME">GAME</option>
            <option value="NEWS">NEWS</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm">요금(원)</label>
          <input className="w-full border rounded-lg p-2" type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm">결제 주기</label>
          <select className="w-full border rounded-lg p-2" value={billingCycle} onChange={(e) => setBillingCycle(e.target.value)}>
            <option value="MONTHLY">MONTHLY</option>
            <option value="YEARLY">YEARLY</option>
            <option value="WEEKLY">WEEKLY</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm">결제일(1~31)</label>
          <input className="w-full border rounded-lg p-2" type="number" min={1} max={31} value={billingDay} onChange={(e) => setBillingDay(Number(e.target.value))} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm">사용 빈도(주당)</label>
          <input className="w-full border rounded-lg p-2" type="number" min={0} value={usage} onChange={(e) => setUsage(Number(e.target.value))} />
        </div>
        <div className="space-y-1">
          <label className="text-sm">만족도(1~5)</label>
          <input className="w-full border rounded-lg p-2" type="number" min={1} max={5} value={satisfaction} onChange={(e) => setSatisfaction(Number(e.target.value))} />
        </div>
      </div>

      <button className="px-4 py-2 border rounded-xl w-full">저장</button>
    </form>
  );
}
