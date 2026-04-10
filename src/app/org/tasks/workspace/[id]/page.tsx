import { Flex, Text } from "@mantine/core";
import {
  Layout01,
  Layout01Left,
  Layout01Main,
} from "@/lib/ui/components/layout/01/01/Layout";
import SidebarNavLinks from "@/features/org/tasks/models/workspace/ui/SidebarNavLinks";
import WorkspaceDetails from "@/features/org/tasks/models/workspace/ui/Details";
import { categoryGetList } from "@/features/org/tasks/models/category/data";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import { priorityGetList } from "@/features/org/tasks/models/priority/data";
import { statusGetList } from "@/features/org/tasks/models/status/data";
import {
  workspaceGet,
  workspaceGetList,
} from "@/features/org/tasks/models/workspace/data";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <Text c={"orange"}>Workspace id not provided.</Text>;
  }

  const headersList = await prepareHeaders();
  const workspaceResponse = await workspaceGet(id, headersList);

  if (workspaceResponse.error || !workspaceResponse.data) {
    notFound();
  }

  return (
    <>
      <Layout01>
        <Layout01Left>
          <aside>
            <Flex direction={"column"}>
              <SidebarNavLinks />
            </Flex>
          </aside>
        </Layout01Left>
        <Layout01Main>
          <main>
            <WorkspaceDetails workspace={workspaceResponse.data} />
          </main>
        </Layout01Main>
      </Layout01>
    </>
  );
}
