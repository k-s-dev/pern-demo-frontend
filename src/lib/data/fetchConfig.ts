"use server";

import { headers } from "next/headers";
import { appConfig } from "../config";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export type TFetchMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS";

export type TFetchApiArgs = {
  endpoint: RequestInfo;
  options?: RequestInit;
};

export async function getFetchBaseApi({
  endpoint,
  options,
  method = "GET",
  baseUrl = appConfig.api.url,
}: TFetchApiArgs & { method?: TFetchMethod; baseUrl?: string }) {
  const cleanedBaseUrl =
    baseUrl && baseUrl[-1] === "/"
      ? baseUrl?.slice(0, baseUrl.length - 1)
      : !baseUrl
        ? ""
        : baseUrl;

  const cleanedEndpoint =
    endpoint.toString()[0] !== "/" ? "/" + endpoint : endpoint;

  const url = cleanedBaseUrl + cleanedEndpoint;

  let data;

  try {
    const response = await fetch(url, {
      method,
      headers: await headers(),
      ...options,
    });
    data = response.json();
  } catch (error) {
    console.log(error);
    data = { error: error };
  }
  return data;
}

export async function fetchBaseApiGet({ endpoint, options }: TFetchApiArgs) {
  return await getFetchBaseApi({
    method: "GET",
    endpoint,
    options,
  });
}

export async function fetchBaseApiPost({ endpoint, options }: TFetchApiArgs) {
  return await getFetchBaseApi({
    method: "POST",
    endpoint,
    options,
  });
}

export async function fetchBaseApiPut({ endpoint, options }: TFetchApiArgs) {
  return await getFetchBaseApi({
    method: "PUT",
    endpoint,
    options,
  });
}

export async function fetchBaseApiPatch({ endpoint, options }: TFetchApiArgs) {
  return await getFetchBaseApi({
    method: "PATCH",
    endpoint,
    options,
  });
}

export async function fetchBaseApiDelete({ endpoint, options }: TFetchApiArgs) {
  return await getFetchBaseApi({
    method: "DELETE",
    endpoint,
    options,
  });
}

export async function fetchBaseApiOptions({
  endpoint,
  options,
}: TFetchApiArgs) {
  return await getFetchBaseApi({
    method: "OPTIONS",
    endpoint,
    options,
  });
}
