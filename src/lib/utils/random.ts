import { randomBytes } from "node:crypto";

export function generateRandomString(nBytes = 6) {
  return randomBytes(nBytes).toString("hex");
}
