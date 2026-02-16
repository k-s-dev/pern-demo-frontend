import { verifyEmailServerAction } from "@/features/auth/features/verifyEmail/serverAction";
import AuthCard from "@/features/auth/lib/ui/components/AuthCard";
import AuthInvalidLink from "@/features/auth/lib/ui/components/AuthInvalidLink";
import { Text } from "@mantine/core";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = params.token;

  // error check dependent on better-auth client
  if (!token || typeof token !== "string") {
    return (
      <AuthInvalidLink title="Verify email">
        Invalid link. Email verification link can be generated from Sign In
        page.
      </AuthInvalidLink>
    );
  }

  const response = await verifyEmailServerAction(token);

  if (response.error) {
    return (
      <AuthInvalidLink title="Verify email">
        Verification failed. Email verification link can be generated from Sign
        In page.
      </AuthInvalidLink>
    );
  }

  return (
    <AuthCard subTitle="Email verification">
      <Text>Email verified successfully and can be used to sign in.</Text>
    </AuthCard>
  );
}
