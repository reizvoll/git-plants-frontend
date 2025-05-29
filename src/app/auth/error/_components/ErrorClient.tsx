"use client";

import { authApi } from "@/api/api";
import { useRouter } from "next/navigation";

interface ErrorClientProps {
  error?: string;
}

export default function ErrorClient({ error }: ErrorClientProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-red-600">Authentication Error</h1>
        <p className="mt-2 text-gray-600">There was a problem with your authentication.</p>
        {error && <p className="text-sm mt-2 text-gray-500">{error}</p>}
        <div className="mt-6 space-x-4">
          <button
            onClick={() => authApi.signInWithGithub()}
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
