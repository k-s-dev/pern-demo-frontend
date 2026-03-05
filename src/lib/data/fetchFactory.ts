"use server";

import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { appConfig } from "../config";
import { prepareUrl } from "./utils";
import { prepareHeaders } from "./prepareHeaders";

export async function customFetch(
  endpoint: string,
  options?: RequestInit,
  method: TFetchMethod = "GET",
  baseUrl: string = appConfig.api.url,
) {
  const url = prepareUrl(baseUrl, endpoint);
  const headers = await prepareHeaders();

  let response;
  let parsedResponse;
  try {
    response = await fetch(url, {
      method,
      headers,
      cache: "force-cache",
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
