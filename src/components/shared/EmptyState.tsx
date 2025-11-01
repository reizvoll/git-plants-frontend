import { cn } from "@/lib/utils/className";

interface EmptyStateProps {
  className?: string;
  title: string;
}

export function EmptyState({ className, title }: EmptyStateProps) {
  return (
    <figure className={cn("flex flex-1 flex-col items-center justify-center gap-4", className)}>
      <figcaption className="whitespace-pre-line text-center font-pretendard text-text-03">{title}</figcaption>
    </figure>
  );
}
