import { headers } from "next/headers";

export function cleanUrl(url: string) {
  const cleanedUrl =
    url[-1] === "/" ? url?.slice(0, url.length - 1) : !url ? "" : url;
  return cleanedUrl;
}

export function cleanEndpoint(endpoint: string) {
  const cleanedEndpoint =
    endpoint.toString()[0] !== "/" ? "/" + endpoint : endpoint;
  return cleanedEndpoint;
}

export function prepareUrl(url: string, endpoint: string) {
  return cleanUrl(url) + cleanEndpoint(endpoint);
}

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
