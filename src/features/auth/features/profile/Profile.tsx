import { Skeleton, Text } from "@mantine/core";
import { ProfileForm } from "./form/Form";
import { Suspense } from "react";
import RequestPasswordReset from "../requestPasswordReset/RequestPasswordReset";
import { getSession } from "../../lib/getSession";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";

export default async function Profile() {
  const sessionData = await getSession();
  if (!sessionData) {
    redirect(routes.auth.signIn);
  }
  const user = sessionData.user;

  return (
    <>
      {!user && (
        <Text fz="h2" m={"auto"}>
          No user signed in.
        </Text>
      )}
      {user && (
        <Suspense fallback={<ProfileFallBack />}>
          <ProfileForm user={user} />
          <RequestPasswordReset user={user} />
        </Suspense>
      )}
    </>
  );
}

export function ProfileFallBack() {
  const height = 50;
  return (
    <>
      <Skeleton height={height} radius="xl" />
      <Skeleton height={height} mt={6} radius="xl" />
      <Skeleton height={height} mt={6} width="70%" radius="xl" />
    </>
  );
}
