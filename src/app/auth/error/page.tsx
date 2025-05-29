import ErrorClient from "./_components/ErrorClient";

export default function AuthError({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  return <ErrorClient error={searchParams.error} />;
}
