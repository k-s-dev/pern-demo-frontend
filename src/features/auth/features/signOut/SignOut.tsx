"use client";

import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth.client";
import { routes } from "@/lib/routes";

export default function SignOut({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      onClick={async () => {
        await authClient.signOut();
        router.push(routes.DEFAULT_SIGNOUT_REDIRECT);
      }}
    >
      {children}
    </div>
  );
}
