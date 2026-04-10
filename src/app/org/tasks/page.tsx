import { taskGetList } from "@/features/org/tasks/models/task/data";
import TaskFilters from "@/features/org/tasks/models/task/ui/Filters";
import TaskList from "@/features/org/tasks/models/task/ui/List";
import TaskSort from "@/features/org/tasks/models/task/ui/Sort";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import {
  Layout02,
  Layout02Left,
  Layout02Main,
  Layout02Right,
} from "@/lib/ui/components/layout/01/02/Layout";

export default async function page() {
  const headersList = await prepareHeaders();
  const taskResponse = await taskGetList(headersList);

  return (
    <>
      <Layout02>
        <Layout02Left>
          <TaskFilters />
        </Layout02Left>
        <Layout02Main>
          <TaskList tasks={taskResponse.data || []} />
        </Layout02Main>
        <Layout02Right>
          <TaskSort />
        </Layout02Right>
      </Layout02>
    </>
  );
}
