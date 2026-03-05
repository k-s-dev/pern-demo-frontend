import { Session } from "better-auth";
import type { TSessionUser } from "./user";

export type TSession = Session;

export type TSessionData = {
  session: TSession;
  user: TSessionUser;
};

export type TOKEN_TYPE = "EMAIL_VERIFICATION" | "RESET_PASSWORD";
