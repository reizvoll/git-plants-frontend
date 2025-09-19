import ErrorClient from "./_components/ErrorClient";

type AuthErrorProps = {
  searchParams: { [key: string]: string | undefined };
};

export default function AuthError({ searchParams }: AuthErrorProps) {
  return <ErrorClient error={searchParams.error} />;
}
