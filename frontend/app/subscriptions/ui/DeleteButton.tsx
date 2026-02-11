"use client";

import { useRouter } from "next/navigation";
import { apiDelete } from "@/lib/api";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  return (
    <button
      className="px-3 py-1.5 border rounded-lg text-sm"
      onClick={async () => {
        const ok = confirm("정말 삭제하시겠습니까?");
        if (!ok) return;
        await apiDelete(`/api/subscriptions/${id}`);
        router.refresh();
      }}
    >
      삭제
    </button>
  );
}
