import Profile from "@/features/auth/features/profile/Profile";
import AuthCard from "@/features/auth/lib/ui/components/AuthCard";

export default async function Page() {
  return (
    <AuthCard subTitle="Profile">
      <Profile />
    </AuthCard>
  );
}
