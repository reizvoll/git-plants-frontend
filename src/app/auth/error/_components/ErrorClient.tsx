"use client";

import { authApi } from "@/api/auth";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface ErrorClientProps {
  error?: string;
}

export default function ErrorClient({ error }: ErrorClientProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-01">
      <div className="text-center">
        <h1 className="font-pretendard text-title1 text-status-danger">Authentication Error</h1>
        <p className="mt-2 font-pretendard text-text-03">There was a problem with your authentication.</p>
        {error && <p className="mt-2 font-pretendard text-caption text-text-02">{error}</p>}
        <div className="mt-6 space-x-4">
          <Button onClick={() => authApi.signInWithGithub()} variant="gray" size="md">
            Try Again
          </Button>
          <Button onClick={() => router.push("/")} variant="grayLine" size="md">
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
