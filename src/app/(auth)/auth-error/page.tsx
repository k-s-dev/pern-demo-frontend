import { getSession } from "@/features/auth/lib/getSession";
import AuthCard from "@/features/auth/lib/ui/components/AuthCard";
import BackToSignInButton from "@/features/auth/lib/ui/components/BackToSignInButton";
import { appConfig } from "@/lib/config";
import { routes } from "@/lib/routes";
import { Text } from "@mantine/core";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sessionData = await getSession();
  const query = await searchParams;
  const error = query.error;

  if (sessionData) {
    redirect(routes.DEFAULT_SIGNIN_REDIRECT);
  }

  return (
    <AuthCard subTitle="Error">
      <Text size="lg" c="red" my="md">
        Sign in failed. Please try again. If the problem persists try another
        method.
      </Text>
      <BackToSignInButton />
      {appConfig.nodeEnv === "development" && error && (
        <Text c={"gray"} my={"md"}>
          Code: {error}
        </Text>
      )}
    </AuthCard>
  );
}
