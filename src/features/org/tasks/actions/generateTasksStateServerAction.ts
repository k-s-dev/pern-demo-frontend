"use server";

import { getSession } from "@/features/auth/lib/getSession";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import { workspaceGetList } from "../models/workspace/data";
import { tagGetList } from "../models/tag/data";
import { taskGetList } from "../models/task/data";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { ITasksState } from "../ui/hooks/TasksContext";
import { TSessionUser } from "@/lib/definitions/backend/auth/user";

export async function generateTasksStateServerAction() {
  const headersList = await prepareHeaders();
  const sessionData = await getSession();
  const workspaceResponse = await workspaceGetList(headersList);
  const tagResponse = await tagGetList(headersList);
  const taskResponse = await taskGetList(headersList);

  if (!sessionData || !sessionData.user) {
    redirect(routes.auth.signIn);
  }

  const tasksStateData: ITasksState = {
    resetKey: true,
    user: sessionData.user as TSessionUser,
    workspaces: workspaceResponse.data || [],
    tags: tagResponse.data || [],
    tasks: taskResponse.data || [],
    filters: {
      workspaces:
        workspaceResponse.data && workspaceResponse.data.length > 0
          ? workspaceResponse.data.map((el) => el.id)
          : [],
      categories: [],
      priorities: [],
      statuses: [],
      tags: [],
      visibility: "active",
    },
    sort: [],
  };

  return tasksStateData;
}
