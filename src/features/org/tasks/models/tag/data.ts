"use server";

import { appConfig } from "@/lib/config";
import { betterFetchBase } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import {
  TTagCreateDataIn,
  TTagIncludeAll,
  TTagUpdatePatchDataIn,
} from "@/lib/definitions/backend/org/tag";
import {
  prepareError,
  TServerResponsePromise,
} from "@/lib/definitions/serverResponse";

export async function tagCreate(
  body: TTagCreateDataIn,
): TServerResponsePromise<TTagIncludeAll> {
  const url = appConfig.api.url + "/org/tag";
  const response = await betterFetchBase<TTagIncludeAll>(url, {
    method: "post",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function tagGetList(): TServerResponsePromise<TTagIncludeAll[]> {
  const url = appConfig.api.url + "/org/tag/list";
  const response = await betterFetchBase<TTagIncludeAll[]>(url, {
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function tagGet(
  id: string,
): TServerResponsePromise<TTagIncludeAll> {
  const url = appConfig.api.url + "/org/tag/" + id;
  const response = await betterFetchBase<TTagIncludeAll>(url, {
    method: "get",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function tagUpdate(
  id: string,
  body: TTagUpdatePatchDataIn,
): TServerResponsePromise<TTagIncludeAll> {
  const url = appConfig.api.url + "/org/tag/" + id;
  const response = await betterFetchBase<TTagIncludeAll>(url, {
    method: "patch",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function tagDelete(
  id: string,
): TServerResponsePromise<TTagIncludeAll> {
  const url = appConfig.api.url + "/org/tag/" + id;
  const response = await betterFetchBase<TTagIncludeAll>(url, {
    method: "delete",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function tagDeleteMany(ids: string[]) {
  const errorIds = [];
  const errorMessages = [];
  for (const id of ids) {
    const response = await tagDelete(id);
    if (response.error) {
      errorIds.push(id);
      errorMessages.push(
        response.error.message || `Failed to delete tag id: ${id}`,
      );
    }
  }
  if (errorIds.length > 0) {
    return {
      error: {
        message: `Failed to delete ${errorIds.length} of ${ids.length} tags.`,
        messages: errorMessages,
      },
    };
  }
  return {
    data: {},
    message: `${ids.length} tag[s] deleted successfully.`,
  };
}
