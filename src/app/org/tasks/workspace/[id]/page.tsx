import { Flex, Text } from "@mantine/core";
import {
  Layout01,
  Layout01Left,
  Layout01Main,
} from "@/lib/ui/components/layout/01/01/Layout";
import SidebarNavLinks from "@/features/org/tasks/models/workspace/ui/SidebarNavLinks";
import WorkspaceDetails from "@/features/org/tasks/models/workspace/ui/Details";
import { workspaceGet } from "@/features/org/tasks/models/workspace/data";
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

  const workspaceResponse = await workspaceGet(id);

  if (workspaceResponse.error || !workspaceResponse.data) {
    notFound();
  }

  return (
    <>
      <Layout01>
        <Layout01Left>
          <Flex direction={"column"}>
            <SidebarNavLinks />
          </Flex>
        </Layout01Left>
        <Layout01Main>
          <WorkspaceDetails workspace={workspaceResponse.data} />
        </Layout01Main>
      </Layout01>
    </>
  );
}
