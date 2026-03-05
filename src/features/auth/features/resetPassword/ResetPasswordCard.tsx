import AuthCard from "../../lib/ui/components/AuthCard";
import SignInLinkButton from "../signIn/SignInLinkButton";

export default function ResetPasswordCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCard subTitle="Reset Password">
      {children}
      <SignInLinkButton />
    </AuthCard>
  );
}
