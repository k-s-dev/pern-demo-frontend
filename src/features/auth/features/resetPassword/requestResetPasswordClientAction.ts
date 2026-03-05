"use client";

import { notifications } from "@mantine/notifications";
import { authClient } from "../../lib/auth.client";
import { routes } from "@/lib/routes";

export async function requestResetPasswordClientAction() {
  const { data: session, error } = await authClient.getSession();

  if (error) {
    notifications.show({
      message: error.message,
      color: "red",
    });
  }

  if (session?.user.email) {
    const { data, error } = await authClient.requestPasswordReset({
      email: session.user.email,
      redirectTo: routes.auth.resetPassword,
    });
    if (data?.status) {
      notifications.show({
        message: data.message,
      });
    }
    if (error) {
      notifications.show({
        message: error.message,
        color: "red",
      });
    }
  } else {
    notifications.show({
      message: "Session not valid. SignIn again.",
      color: "red",
    });
  }
}
