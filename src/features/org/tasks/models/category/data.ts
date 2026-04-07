"use server";

import { appConfig } from "@/lib/config";
import { betterFetchBase } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import {
  TCategoryCreateDataIn,
  TCategoryIncludeAll,
  TCategoryUpdatePatchDataIn,
} from "@/lib/definitions/backend/org/category";
import {
  prepareError,
  TServerResponsePromise,
} from "@/lib/definitions/serverResponse";

export async function categoryCreate(
  body: TCategoryCreateDataIn,
): TServerResponsePromise<TCategoryIncludeAll> {
  const url = appConfig.api.url + "/org/category";
  const response = await betterFetchBase<TCategoryIncludeAll>(url, {
    method: "post",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function categoryGetList(): TServerResponsePromise<
  TCategoryIncludeAll[]
> {
  const url = appConfig.api.url + "/org/category/list";
  const response = await betterFetchBase<TCategoryIncludeAll[]>(url, {
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function categoryGet(
  id: string,
): TServerResponsePromise<TCategoryIncludeAll> {
  const url = appConfig.api.url + "/org/category/" + id;
  const response = await betterFetchBase<TCategoryIncludeAll>(url, {
    method: "get",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function categoryUpdate(
  id: string,
  body: TCategoryUpdatePatchDataIn,
): TServerResponsePromise<TCategoryIncludeAll> {
  const url = appConfig.api.url + "/org/category/" + id;
  const response = await betterFetchBase<TCategoryIncludeAll>(url, {
    method: "patch",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function categoryDelete(
  id: string,
): TServerResponsePromise<TCategoryIncludeAll> {
  const url = appConfig.api.url + "/org/category/" + id;
  const response = await betterFetchBase<TCategoryIncludeAll>(url, {
    method: "delete",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function categoryDeleteMany(ids: string[]) {
  const errorIds = [];
  const errorMessages = [];
  for (const id of ids) {
    const response = await categoryDelete(id);
    if (response.error) {
      errorIds.push(id);
      errorMessages.push(
        response.error.message || `Failed to delete category id: ${id}`,
      );
    }
  }
  if (errorIds.length > 0) {
    return {
      error: {
        message: `Failed to delete ${errorIds.length} of ${ids.length} Categories.`,
        messages: errorMessages,
      },
    };
  }
  return {
    data: {},
    message: `${ids.length} category[s] deleted successfully.`,
  };
}
