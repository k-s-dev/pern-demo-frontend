import { Skeleton, Text } from "@mantine/core";
import { ProfileForm } from "./form/Form";
import { betterAuthFetch } from "@/lib/data/betterFetchFactory";
import { authEndpoints } from "../../lib/authEndpoints";
import { TSessionData } from "@/lib/definitions/backend/auth/generic";
import { Suspense } from "react";
import { prepareHeaders } from "@/lib/data/utils";
import RequestPasswordReset from "../requestPasswordReset/RequestPasswordReset";
import { tags } from "@/lib/constants";

export default async function Profile() {
  const sessionData = await betterAuthFetch<TSessionData>(
    authEndpoints["/get-session"],
    {
      headers: await prepareHeaders(),
      next: {
        tags: [tags.session.tag],
      },
    },
  );

  const user = sessionData.data?.user;

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
