"use server";

import { appConfig } from "@/lib/config";
import { betterFetchBase } from "@/lib/data/betterFetchFactory";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import {
  TStatusCreateDataIn,
  TStatusIncludeAll,
  TStatusUpdatePatchDataIn,
} from "@/lib/definitions/backend/org/status";
import {
  prepareError,
  TServerResponsePromise,
} from "@/lib/definitions/serverResponse";
import { routes } from "@/lib/routes";
import { revalidatePath } from "next/cache";

export async function statusCreate(
  body: TStatusCreateDataIn,
): TServerResponsePromise<TStatusIncludeAll> {
  const url = appConfig.api.url + "/org/status";
  const response = await betterFetchBase<TStatusIncludeAll>(url, {
    method: "post",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function statusGetList(): TServerResponsePromise<
  TStatusIncludeAll[]
> {
  const url = appConfig.api.url + "/org/status/list";
  const response = await betterFetchBase<TStatusIncludeAll[]>(url, {
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function statusGet(
  id: string,
): TServerResponsePromise<TStatusIncludeAll> {
  const url = appConfig.api.url + "/org/status/" + id;
  const response = await betterFetchBase<TStatusIncludeAll>(url, {
    method: "get",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  return { data: response.data };
}

export async function statusUpdate(
  id: string,
  body: TStatusUpdatePatchDataIn,
): TServerResponsePromise<TStatusIncludeAll> {
  const url = appConfig.api.url + "/org/status/" + id;
  const response = await betterFetchBase<TStatusIncludeAll>(url, {
    method: "patch",
    headers: await prepareHeaders(),
    body: JSON.stringify(body),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function statusDelete(
  id: string,
): TServerResponsePromise<TStatusIncludeAll> {
  const url = appConfig.api.url + "/org/status/" + id;
  const response = await betterFetchBase<TStatusIncludeAll>(url, {
    method: "delete",
    headers: await prepareHeaders(),
  });
  if (response.error) return prepareError(response.error);
  revalidatePath(routes.org.tasks.root);
  return { data: response.data };
}

export async function statusDeleteMany(ids: string[]) {
  const errorIds = [];
  const errorMessages = [];
  for (const id of ids) {
    const response = await statusDelete(id);
    if (response.error) {
      errorIds.push(id);
      errorMessages.push(
        response.error.message || `Failed to delete status id: ${id}`,
      );
    }
  }
  if (errorIds.length > 0) {
    return {
      error: {
        message: `Failed to delete ${errorIds.length} of ${ids.length} statuses.`,
        messages: errorMessages,
      },
    };
  }
  revalidatePath(routes.org.tasks.root);
  return {
    data: {},
    message: `${ids.length} status[s] deleted successfully.`,
  };
}
