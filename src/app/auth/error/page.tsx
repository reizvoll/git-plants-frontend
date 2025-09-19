import ErrorClient from "./_components/ErrorClient";

type AuthErrorProps = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function AuthError({ searchParams }: AuthErrorProps) {
  const params = await searchParams;
  return <ErrorClient error={params.error} />;
}
