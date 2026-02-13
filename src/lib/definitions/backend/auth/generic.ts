import type { Session } from "../prisma/client";
import type { TSessionUser } from "./user";

export type TSessionData = {
  session: Session;
  user: TSessionUser;
};

export type TOKEN_TYPE = "EMAIL_VERIFICATION" | "RESET_PASSWORD";
