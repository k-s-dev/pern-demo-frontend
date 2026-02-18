"use client";

import { Button } from "@mantine/core";
import { requestPasswordReset } from "../../lib/api";
import { TUser } from "../../lib/definitions";
import { notifications } from "@mantine/notifications";

export default function RequestPasswordReset({ user }: { user: TUser }) {
  async function handleClick() {
    const response = await requestPasswordReset({ email: user.email });
    if (response.error) {
      notifications.show({
        message: "Password reset request failed. Please try again later.",
        autoClose: false,
      });
    }
    notifications.show({
      message:
        "Link to reset password has been sent to the resigtered email.",
      autoClose: false,
    });
  }
  return (
    <Button variant="light" color="blue" onClick={handleClick}>
      Reset Password
    </Button>
  );
}
