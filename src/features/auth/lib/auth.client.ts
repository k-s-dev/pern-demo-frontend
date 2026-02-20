"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { USER_ROLE } from "./definitions";

export const authClient = createAuthClient({
  /**
   * baseURL has to be sourced directly from process.env rather than appConfig
   * https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser
   */
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: Object.keys(USER_ROLE),
        },
      },
    }),
    {
      // https://github.com/better-auth/better-auth/discussions/5336
      id: "next-cookies-request",
      fetchPlugins: [
        {
          id: "next-cookies-request-plugin",
          name: "next-cookies-request-plugin",
          hooks: {
            async onRequest(ctx) {
              if (typeof window === "undefined") {
                const { cookies } = await import("next/headers");
                const headers = await cookies();
                ctx.headers.set("cookie", headers.toString());
              }
            },
          },
        },
      ],
    },
  ],
});
