"use server";

import { appConfig } from "../config";
import { createFetch } from "@better-fetch/fetch";
import { cleanUrl } from "./utils";

export const betterFetchBase = createFetch({
  baseURL: cleanUrl(appConfig.api.url),
  customFetchImpl: globalThis.fetch,
  credentials: "include",
  cache: "no-store",
});
