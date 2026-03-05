"use server";

import { headers } from "next/headers";

export async function prepareHeaders() {
  const headersIn = await headers();
  const headersOut = new Headers();

  headersIn.entries().forEach(([k, v]) => {
    if (["origin", "authorization", "cookie"].includes(k)) {
      headersOut.set(k, v);
    }
  });

  headersOut.set("Content-Type", "application/json");

  if (!headersOut.get("origin")) {
    const origin =
      (headersIn.get("x-forwarded-proto") as string) +
      "://" +
      headersIn.get("x-forwarded-host");

    headersOut.set("origin", origin);
  }

  return headersOut;
}
