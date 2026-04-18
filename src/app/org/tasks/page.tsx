import { getSession } from "@/features/auth/lib/getSession";
import { tagGetList } from "@/features/org/tasks/models/tag/data";
import { taskGetList } from "@/features/org/tasks/models/task/data";
import TaskFilters from "@/features/org/tasks/models/task/ui/Filters";
import TaskList from "@/features/org/tasks/models/task/ui/List";
import TaskSort from "@/features/org/tasks/models/task/ui/Sort";
import { workspaceGetList } from "@/features/org/tasks/models/workspace/data";
import {
  ITasksState,
  TasksProvider,
} from "@/features/org/tasks/ui/hooks/TasksContext";
import { routes } from "@/lib/routes";
import {
  Layout02,
  Layout02Left,
  Layout02Main,
  Layout02Right,
} from "@/lib/ui/components/layout/01/02/Layout";
import { Skeleton } from "@mantine/core";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const sessionData = await getSession();
  const workspaceResponse = await workspaceGetList();
  const tagResponse = await tagGetList();
  const taskResponse = await taskGetList();

  if (!sessionData || !sessionData.user) {
    return redirect(routes.auth.signIn);
  }

  const tasksStateData: ITasksState = {
    resetKey: true,
    user: sessionData.user,
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
      <TasksProvider initialData={tasksStateData}>
        <Layout02>
          <Layout02Left>
            <TaskFilters />
          </Layout02Left>
          <Layout02Main>
            <Suspense fallback={<Skeleton w={200} h={200} />}>
              <TaskList tasks={taskResponse.data || []} />
            </Suspense>
          </Layout02Main>
          <Layout02Right>
            <Suspense fallback={<Skeleton w={200} h={200} />}>
              <TaskSort />
            </Suspense>
          </Layout02Right>
        </Layout02>
      </TasksProvider>
    </>
  );
}
