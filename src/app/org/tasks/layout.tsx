import { auth } from "@/features/auth/lib/auth";
import { tagGetList } from "@/features/org/tasks/models/tag/data";
import { taskGetList } from "@/features/org/tasks/models/task/data";
import { workspaceGetList } from "@/features/org/tasks/models/workspace/data";
import {
  ITasksState,
  TasksProvider,
} from "@/features/org/tasks/ui/hooks/TasksContext";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import { TSessionData } from "@/lib/definitions/backend/auth/generic";
import { TSessionUser } from "@/lib/definitions/backend/auth/user";
import { routes } from "@/lib/routes";
import { SessionProvider } from "@/lib/ui/components/providers/SessionProvider";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sessionPromise = auth.api.getSession({
    headers: await prepareHeaders(),
  }) as unknown as Promise<TSessionData>;

  if (!session || !session.user) {
    return redirect(routes.auth.signIn);
  }

  const workspaceResponse = await workspaceGetList();
  const tagResponse = await tagGetList();
  const taskResponse = await taskGetList();

  const tasksStateData: ITasksState = {
    user: session.user as TSessionUser,
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

  return (
    <>
      <SessionProvider initialSessionDataPromise={sessionPromise}>
        <TasksProvider stateData={tasksStateData}>{children}</TasksProvider>
      </SessionProvider>
    </>
  );
}
