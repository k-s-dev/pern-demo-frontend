"use client";

import { authClient } from "@/features/auth/auth.client";
import { Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";

export default function SignIn() {
  async function handleClick() {
    const response = await authClient.signIn.email(
      {
        email: "test01@example.com",
        password: "1234abcd",
      },
      {
        onError(ctx) {
          console.log(ctx.request);
        },
      },
    );
    // alert(JSON.stringify(response, null, 2));
    notifications.show({
      message: <pre>{JSON.stringify(response, null, 2)}</pre>,
      autoClose: 10000,
      autoFocus: true,
    });
  }

  return (
    <Button type="button" variant="gradient" onClick={handleClick}>
      SignIn
    </Button>
  );
}
