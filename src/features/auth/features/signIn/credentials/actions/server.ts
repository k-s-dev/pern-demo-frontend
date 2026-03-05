"use server";

import { TServerResponsePromise } from "@/lib/definitions/serverResponse";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { auth } from "@/features/auth/lib/auth";

export async function signInEmailServerAction(body: {
  email: string;
  password: string;
  rememberMe: boolean;
}): TServerResponsePromise<{
  redirect: boolean;
  token: string;
  url?: string | undefined;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined | undefined;
    role: "ADMIN" | "USER" | null | undefined;
  };
}> {
  const response = await auth.api.signInEmail({ body });

  if (!response.user) {
    return {
      error: {
        messages: ["Sign in failed due to internal server error."],
      },
    };
  }

  redirect(routes.DEFAULT_SIGNIN_REDIRECT);
}
