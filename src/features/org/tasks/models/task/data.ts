"use server";

import { appConfig } from "@/lib/config";
import { betterFetchBase } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import {
  TTaskCreateDataIn,
  TTaskIncludeAll,
  TTaskUpdatePatchDataIn,
} from "@/lib/definitions/backend/org/task";
import {
  prepareError,
  TServerResponsePromise,
} from "@/lib/definitions/serverResponse";

export async function taskCreate(
  body: TTaskCreateDataIn,
): TServerResponsePromise<TTaskIncludeAll> {
  const url = appConfig.api.url + "/org/task";
  const response = await betterFetchBase<TTaskIncludeAll>(url, {
    method: "post",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function taskGetList(
  headersList: Headers,
): TServerResponsePromise<TTaskIncludeAll[]> {
  const url = appConfig.api.url + "/org/task/list";
  const response = await betterFetchBase<TTaskIncludeAll[]>(url, {
    headers: headersList,
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function taskGet(
  id: string,
  headersList: Headers,
): TServerResponsePromise<TTaskIncludeAll> {
  const url = appConfig.api.url + "/org/task/" + id;
  const response = await betterFetchBase<TTaskIncludeAll>(url, {
    method: "get",
    headers: headersList,
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function taskUpdate(
  id: string,
  body: TTaskUpdatePatchDataIn,
): TServerResponsePromise<TTaskIncludeAll> {
  const url = appConfig.api.url + "/org/task/" + id;
  const response = await betterFetchBase<TTaskIncludeAll>(url, {
    method: "patch",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function taskDelete(
  id: string,
): TServerResponsePromise<TTaskIncludeAll> {
  const url = appConfig.api.url + "/org/task/" + id;
  const response = await betterFetchBase<TTaskIncludeAll>(url, {
    method: "delete",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function taskDeleteMany(ids: string[]) {
  const errorIds = [];
  const errorMessages = [];
  for (const id of ids) {
    const response = await taskDelete(id);
    if (response.error) {
      errorIds.push(id);
      errorMessages.push(
        response.error.message || `Failed to delete task id: ${id}`,
      );
    }
  }
  if (errorIds.length > 0) {
    return {
      error: {
        message: `Failed to delete ${errorIds.length} of ${ids.length} tasks.`,
        messages: errorMessages,
      },
    };
  }
  return {
    data: {},
    message: `${ids.length} task[s] deleted successfully.`,
  };
}
