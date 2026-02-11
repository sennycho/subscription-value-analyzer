import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { Subscription } from "@/lib/types";
import DeleteButton from "./ui/DeleteButton.tsx";

export default async function SubscriptionsPage() {
  const items = await apiGet<Subscription[]>("/api/subscriptions");

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">구독 목록</h1>
        <nav className="flex gap-4">
          <Link className="underline" href="/">대시보드</Link>
          <Link className="underline" href="/subscriptions/new">구독 추가</Link>
        </nav>
      </header>

      {items.length === 0 ? (
        <p className="text-sm text-gray-600">등록된 구독이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {items.map((s) => (
            <div key={s.id} className="border rounded-2xl p-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-600">
                  {s.category} · {s.billing_cycle} · 결제일 {s.billing_day ?? "-"}일
                </div>
                <div className="text-sm">
                  월 환산 <b>{Math.round(s.monthly_equivalent).toLocaleString()}원</b> · 가치{" "}
                  <b>{s.value_score ?? "-"}</b> · 낭비 <b>{s.waste_score ?? "-"}</b>
                </div>
              </div>

              <DeleteButton id={s.id} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
