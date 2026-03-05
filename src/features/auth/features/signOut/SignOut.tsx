"use client";

import { signOutServerAction } from "./server.action";
import { useSessionContext } from "@/lib/ui/components/providers/SessionProvider";

export default function SignOut({ children }: { children: React.ReactNode }) {
  const sessionCtx = useSessionContext();

  return (
    <div
      onClick={async () => {
        sessionCtx.setSessionDataPromise(null);
        await signOutServerAction();
      }}
    >
      {children}
    </div>
  );
}
