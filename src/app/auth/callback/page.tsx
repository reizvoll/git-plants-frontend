import CallbackClient from "./_components/CallbackClient";

type CallbackPageProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function CallbackPage({ searchParams }: CallbackPageProps) {
  const params = await searchParams;
  return <CallbackClient error={params.error} className="flex w-full flex-col items-center justify-center" />;
}
