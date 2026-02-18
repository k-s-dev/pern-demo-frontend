import { authClient } from "./auth.client";

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type USER_ROLE = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type TSession = typeof authClient.$Infer.Session;

export type TUser = typeof authClient.$Infer.Session.user;
