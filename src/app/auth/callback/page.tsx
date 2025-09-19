import CallbackClient from "./_components/CallbackClient";

type CallbackPageProps = {
  searchParams: { [key: string]: string | undefined };
};

export default function CallbackPage({ searchParams }: CallbackPageProps) {
  return <CallbackClient error={searchParams.error} className="flex w-full flex-col items-center justify-center" />;
}
