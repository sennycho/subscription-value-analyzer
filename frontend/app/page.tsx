import Link from "next/link";
import { apiGet } from "@/lib/api";
import type { Dashboard } from "@/lib/types";

export default async function Home() {
  const data = await apiGet<Dashboard>("/api/dashboard");

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Subscription Value Analyzer</h1>
        <nav className="flex gap-4">
          <Link className="underline" href="/subscriptions">
            구독 목록
          </Link>
          <Link className="underline" href="/subscriptions/new">
            구독 추가
          </Link>
        </nav>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border rounded-2xl p-4">
          <div className="text-sm text-gray-600">월 총액</div>
          <div className="text-2xl font-semibold">
            {Math.round(data.monthly_total).toLocaleString()}원
          </div>
        </div>
        <div className="border rounded-2xl p-4">
          <div className="text-sm text-gray-600">연 환산</div>
          <div className="text-2xl font-semibold">
            {Math.round(data.yearly_total).toLocaleString()}원
          </div>
        </div>
      </section>

      <section className="border rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">해지 후보 Top3</h2>
          <div className="text-sm text-gray-700">
            예상 절감{" "}
            <b>{Math.round(data.potential_savings_monthly).toLocaleString()}원/월</b>
          </div>
        </div>

        {data.top_candidates.length === 0 ? (
          <p className="text-sm text-gray-600">
            아직 평가(사용량/만족도)가 입력된 구독이 없습니다.
          </p>
        ) : (
          <ul className="space-y-2">
            {data.top_candidates.map((c) => (
              <li key={c.id} className="border rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm">
                    월 환산 <b>{Math.round(c.monthly_equivalent).toLocaleString()}원</b>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  사용/주: {c.usage_per_week ?? "-"} · 만족도: {c.satisfaction ?? "-"} · 가치점수:{" "}
                  {c.value_score ?? "-"} · 낭비점수: {c.waste_score ?? "-"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
