import ResetPasswordForm from "@/features/auth/features/resetPassword/Form";
import ResetPasswordCard from "@/features/auth/features/resetPassword/ResetPasswordCard";
import AuthInvalidLink from "@/features/auth/lib/ui/components/AuthInvalidLink";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const token = (await searchParams).token;

  if (!token || typeof token !== "string") {
    return (
      <AuthInvalidLink title="Reset Password">
        Invalid link. Reset password link can be generated from Sign In page.
      </AuthInvalidLink>
    );
  }

  return (
    <ResetPasswordCard>
      <ResetPasswordForm token={token} />
    </ResetPasswordCard>
  );
}
