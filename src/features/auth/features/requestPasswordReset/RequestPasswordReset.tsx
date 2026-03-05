"use client";

import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { authClient } from "../../lib/auth.client";
import { TSessionUser } from "@/lib/definitions/backend/auth/user";
import { routes } from "@/lib/routes";

export default function RequestPasswordReset({ user }: { user: TSessionUser }) {
  async function handleClick() {
    const response = await authClient.requestPasswordReset({
      email: user.email,
      redirectTo: window.location.origin + routes.auth.resetPassword,
    });
    if (response.error) {
      notifications.show({
        message: "Password reset request failed. Please try again later.",
        autoClose: false,
      });
    }
    notifications.show({
      message: "Link to reset password has been sent to the resigtered email.",
      autoClose: false,
    });
  }
  return (
    <Button variant="light" color="blue" onClick={handleClick}>
      Reset Password
    </Button>
  );
}
