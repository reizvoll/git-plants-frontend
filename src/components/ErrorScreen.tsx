"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset?: () => void;
};

const ErrorScreen = ({ error, reset }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const router = useRouter();
  return (
    <section className="fixed inset-0 m-auto flex items-center justify-center">
      <article className="text-center">
        <h2 className="text-heading font-bold">Error!</h2>
        <p className="mt-6 text-subtitle font-medium text-text-03">{error.message}</p>

        <div className="flex w-full justify-center gap-2">
          <Button asChild variant="primary" size="lg" className="min-w-40" onClick={() => router.push("/")}>
            Home
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() =>
              startTransition(() => {
                router.refresh();
                reset?.();
              })
            }
            className="min-w-40"
          >
            Retry
          </Button>
        </div>
      </article>
    </section>
  );
};

export default ErrorScreen;
