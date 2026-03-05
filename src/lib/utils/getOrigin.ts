"use server";

import { headers } from "next/headers";

export async function getOrigin() {
  const headersList = await headers();
  const host = headersList.get("host"); // e.g., 'localhost:3000' or 'mywebsite.net'

  // Determine the protocol based on the host or other headers (like 'x-forwarded-proto' if behind a proxy)
  const protocol =
    headersList.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https");

  const origin = `${protocol}://${host}`;

  return origin;
}
