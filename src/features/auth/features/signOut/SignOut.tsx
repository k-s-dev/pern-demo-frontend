"use client";

import { useRouter } from "next/navigation";
import { signOutServerAction } from "./server.action";
import { routes } from "@/lib/routes";

export default function SignOut({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      onClick={async () => {
        await signOutServerAction();
        router.push(routes.DEFAULT_SIGNOUT_REDIRECT);
      }}
    >
      {children}
    </div>
  );
}
