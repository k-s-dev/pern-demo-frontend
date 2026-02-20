"use server";

import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { appConfig } from "../config";
import { headers } from "next/headers";

const utils = {
  cleanUrl(url: string) {
    const cleanedUrl =
      url[-1] === "/" ? url?.slice(0, url.length - 1) : !url ? "" : url;
    return cleanedUrl;
  },

  cleanEndpoint(endpoint: string) {
    const cleanedEndpoint =
      endpoint.toString()[0] !== "/" ? "/" + endpoint : endpoint;
    return cleanedEndpoint;
  },

  prepareUrl(url: string, endpoint: string) {
    return this.cleanUrl(url) + this.cleanEndpoint(endpoint);
  },

  async prepareHeaders() {
    const headersIn = await headers();
    const headersOut = new Headers();

    headersIn.entries().forEach(([k, v]) => {
      if (["origin", "authorization", "cookie"].includes(k)) {
        headersOut.set(k, v);
      }
    });

    headersOut.set("Content-Type", "application/json");

    return headersOut;
  },
};

export async function customFetch(
  endpoint: string,
  options?: RequestInit,
  method: TFetchMethod = "GET",
  baseUrl: string = appConfig.api.url,
) {
  const url = utils.prepareUrl(baseUrl, endpoint);
  const headers = await utils.prepareHeaders();

  let response;
  let parsedResponse;
  try {
    response = await fetch(url, {
      method,
      headers,
      ...options,
    });
    parsedResponse = await response.json();
  } catch (error) {
    console.log(error);
    parsedResponse = { error: error };
  }
  return {
    status: response?.status,
    data: parsedResponse,
  };
}

export async function authFetch(
  endpoint: string,
  method: TFetchMethod = "GET",
  options?: RequestInit,
) {
  return await customFetch(
    endpoint,
    options,
    method,
    appConfig.betterAuth.baseUrl,
  );
}

export type TCustomFetchArgs = {
  baseUrl: string;
  options?: RequestInit;
};

export type TFetchMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS";
