"use server";

import { appConfig } from "../config";
import { createFetch } from "@better-fetch/fetch";
import { cleanUrl } from "./utils";

export const betterFetch = createFetch({
  baseURL: cleanUrl(appConfig.api.url),
  customFetchImpl: globalThis.fetch,
});

export const betterAuthFetch = createFetch({
  baseURL: cleanUrl(appConfig.betterAuth.baseUrl),
  customFetchImpl: globalThis.fetch,
});
