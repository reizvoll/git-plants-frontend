import CallbackClient from "./_components/CallbackClient";

export default function CallbackPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <CallbackClient error={searchParams.error} />
    </div>
  );
}
