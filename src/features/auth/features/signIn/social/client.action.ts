"use client";

import { SocialProvider } from "better-auth";
import { notifications } from "@mantine/notifications";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { authClient } from "@/features/auth/lib/auth.client";

export async function signInSocialClientAction(oAuthProvider: SocialProvider) {
  const callbackURL = routes.DEFAULT_SIGNIN_REDIRECT;
  const errorCallbackURL = routes.auth.error;
  const response = await authClient.signIn.social({
    provider: oAuthProvider,
    callbackURL,
    errorCallbackURL,
    disableRedirect: false,
  });
  if (response?.error) {
    notifications.show({
      message: ["Sign in failed due to internal server error."],
      autoClose: true,
    });
  } else {
    redirect(routes.DEFAULT_SIGNIN_REDIRECT);
  }
}
