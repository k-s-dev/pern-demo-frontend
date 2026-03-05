"use client";

import { Button } from "@mantine/core";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { authClient } from "../../auth.client";

export default function BackToSignInButton() {
  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
        redirect(routes.auth.signIn);
      }}
      variant="light"
      color="blue"
    >
      Back to sign in
    </Button>
  );
}
