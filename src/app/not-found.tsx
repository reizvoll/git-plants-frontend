"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-01">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-pretendard text-title1 text-status-danger">Page Not Found</h1>
        <p className="font-pretendard text-text-03">The page you are looking for does not exist.</p>
        <Button onClick={() => router.push("/")} variant="grayLine" size="md" className="mt-2">
          Go Home
        </Button>
      </div>
    </div>
  );
}
