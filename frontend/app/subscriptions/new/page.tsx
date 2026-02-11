import Link from "next/link";
import NewForm from "./ui/NewForm";

export default function NewSubscriptionPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold">구독 추가</h1>
        <nav className="flex gap-4">
          <Link className="underline" href="/">대시보드</Link>
          <Link className="underline" href="/subscriptions">구독 목록</Link>
        </nav>
      </header>

      <NewForm />
    </main>
  );
}
