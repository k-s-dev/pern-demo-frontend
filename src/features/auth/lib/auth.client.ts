"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { USER_ROLE } from "./definitions";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: Object.keys(USER_ROLE),
        },
      },
    }),
  ],
});
