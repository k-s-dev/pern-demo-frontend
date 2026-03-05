import { getSession } from "@/features/auth/lib/getSession";
import { SessionProvider } from "../providers/SessionProvider";
import NavUserClient from "./NavUserClient";
import { Suspense } from "react";
import { Skeleton } from "@mantine/core";

export default async function NavUser() {
  const sessionDataPromise = getSession();

  return (
    <SessionProvider initialSessionDataPromise={sessionDataPromise}>
      <Suspense fallback={<Skeleton circle h={30} w={30} />}>
        <NavUserClient />
      </Suspense>
    </SessionProvider>
  );
}
